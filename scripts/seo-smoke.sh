#!/usr/bin/env bash
# SEO + GEO smoke test (see SEO_GEO_AUDIT.md §11).
# Renders each page with a no-JS crawler user agent and asserts the static HTML
# carries a heading, real item links, and the correct status codes.
# Run against a built app:  ./scripts/seo-smoke.sh http://localhost:3000
set -uo pipefail
BASE="${1:-http://localhost:3000}"
UA="Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)"
fail=0

check() { # path pattern label
  body=$(curl -s -A "$UA" "$BASE$1")
  if ! grep -q "$2" <<<"$body"; then echo "FAIL  $3 ($1) — missing: $2"; fail=1
  else echo "ok    $3"; fi
}

check_absent() { # path pattern label
  body=$(curl -s -A "$UA" "$BASE$1")
  if grep -q "$2" <<<"$body"; then echo "FAIL  $3 ($1) — must not contain: $2"; fail=1
  else echo "ok    $3"; fi
}

check /            '<h1'              'home has <h1>'
check /tools       '<h1'              'tools hub has <h1> in server HTML'
check /tools       '/tools/[a-z-]*/[a-z0-9-]*' 'tools hub links real items without JS'
check /dev-tools   '<h1'              'dev-tools hub has <h1> in server HTML'
check /courses     '<h1'              'courses hub has <h1> in server HTML'
check /offers      '<h1'              'offers hub has <h1> in server HTML'
check /edittools   '<h1'              'edittools hub has <h1> in server HTML'
check /llms.txt    'Top AI tools'     'llms.txt served'
check /llms.txt    'llms-full.txt'    'llms.txt advertises the full dump'
check /llms-full.txt '## Courses'     'llms-full.txt served'
check /robots.txt  'OAI-SearchBot'    'robots.txt covers modern AI agents'
check_absent /llms.txt '/guides'      'llms.txt has no dead /guides link while GUIDES_ENABLED=false'
# /skills/* should be crawler-blocked at the HTTP layer (next.config headers).
if curl -s -D - -o /dev/null "$BASE/skills/seo.md" | grep -qi 'x-robots-tag: noindex'; then
  echo "ok    /skills/* serves X-Robots-Tag noindex"
else
  echo "FAIL  /skills/* missing X-Robots-Tag noindex"; fail=1
fi

# Legacy one-segment URLs must be real 308s, not 200 + meta-refresh.
for u in /tools/chatgpt /categories/coding; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "$BASE$u")
  if [ "$code" = "308" ]; then echo "ok    $u is a 308"
  else echo "FAIL  $u returned $code (want 308)"; fail=1; fi
done

# Category hubs are real pages (audit §8).
for u in /tools/coding /tools/seo; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "$BASE$u")
  body=$(curl -s -A "$UA" "$BASE$u")
  if [ "$code" = "200" ] && grep -q '<h1' <<<"$body"; then echo "ok    $u hub is 200 with H1"
  else echo "FAIL  $u returned $code without H1"; fail=1; fi
done

# Unknown catalogue URLs must be real 404s, not 200 soft-404s (audit §14).
# (/tools/<unknown> is the exception: it 308s to the hub, matching the
# historical redirect('/tools') fallback.)
for u in /dev-tools/nope /courses/nope /offers/nope/nope2 /edittools/nope /tools/coding/no-such-tool; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "$BASE$u")
  if [ "$code" = "404" ]; then echo "ok    $u is a 404"
  else echo "FAIL  $u returned $code (want 404)"; fail=1; fi
done

# Unknown legacy-style URL under /tools falls back to the hub with a 308.
code=$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "$BASE/tools/no-such-tool")
if [ "$code" = "308" ]; then echo "ok    /tools/no-such-tool is a 308 to /tools"
else echo "FAIL  /tools/no-such-tool returned $code (want 308)"; fail=1; fi

# /guides 404s while disabled (its body may still say "Page not found").
code=$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "$BASE/guides")
if [ "$code" = "404" ]; then echo "ok    /guides is a 404 while GUIDES_ENABLED=false"
else echo "INFO  /guides returned $code (noindex is set in its metadata)"; fi

exit $fail
