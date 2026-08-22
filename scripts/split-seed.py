#!/usr/bin/env python3
"""One-off: split lib/seed.ts into lib/seed/*.ts modules (pure refactor)."""
import re, os

SRC = 'lib/seed.ts'
OUT = 'lib/seed'

lines = open(SRC).read().split('\n')

def find(prefix):
    for i, l in enumerate(lines):
        if l.startswith(prefix):
            return i
    raise SystemExit(f'marker not found: {prefix}')

# Segment boundaries (start line of each top-level declaration)
bounds = {
    'imports': 0,
    'shared': find('const NOW'),
    'users': find('export const SEED_USERS'),
    'tools': find('const toolsPart1'),
    'prompts': find('export const SEED_PROMPTS'),
    'devtools': find('export const SEED_DEV_TOOLS'),
    'repos': find('export const SEED_REPOS'),
    'courses': find('export const SEED_COURSES'),
    'offers': find('export const SEED_OFFERS'),
    'comments': find('export const SEED_COMMENTS'),
}
order = list(bounds.items())

def seg(a, b):
    """lines[a:b) with trailing blank lines trimmed"""
    chunk = lines[bounds[a] if isinstance(a, str) else a: bounds[b] if isinstance(b, str) else b]
    while chunk and chunk[-1].strip() == '':
        chunk.pop()
    return chunk

os.makedirs(OUT, exist_ok=True)

def header(types, extra=''):
    h = ''
    if types:
        h += "import type {\n" + ",\n".join(f"  {t}" for t in types) + "\n} from '@/types'\n\n"
    if extra:
        h += extra + '\n'
    return h

files = {}

# _shared.ts — NOW + daysAgo (comment line sits right above `const NOW`)
shared_start = bounds['shared']
while shared_start > 0 and lines[shared_start - 1].startswith('//'):
    shared_start -= 1
files['_shared.ts'] = (
    "// Stable ISO timestamps (seeded relative to a fixed base so listings look \"recent\")\n"
    + '\n'.join(lines[shared_start:bounds['users']]).rstrip() + '\n'
)

# users.ts
files['users.ts'] = (
    header(['User']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(seg('users', 'tools')) .rstrip() + '\n'
)

# tools.ts — toolsPart1 + toolsPart2 + SEED_TOOLS
tools_chunk = seg('tools', 'prompts')
files['tools.ts'] = (
    header(['Tool']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(tools_chunk).rstrip() + '\n'
)

# prompts.ts
files['prompts.ts'] = header(['Prompt']) + '\n'.join(seg('prompts', 'devtools')).strip() + '\n'

# dev-tools.ts
files['dev-tools.ts'] = (
    header(['DevTool']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(seg('devtools', 'repos')).rstrip() + '\n'
)

# repos.ts
files['repos.ts'] = (
    header(['Repo']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(seg('repos', 'courses')).rstrip() + '\n'
)

# courses.ts
files['courses.ts'] = (
    header(['Course']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(seg('courses', 'offers')).rstrip() + '\n'
)

# offers.ts
files['offers.ts'] = (
    header(['Offer']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(seg('offers', 'comments')).rstrip() + '\n'
)

# comments.ts
files['comments.ts'] = (
    header(['Comment']) + "import { daysAgo } from './_shared'\n\n"
    + '\n'.join(seg('comments', None)).rstrip() + '\n'
)

for name, content in files.items():
    open(os.path.join(OUT, name), 'w').write(content)
    print(f"wrote lib/seed/{name}: {len(content.split(chr(10)))} lines")

# index.ts — identical public API to the old single file
index_src = """export { SEED_USERS } from './users'
export { SEED_TOOLS } from './tools'
export { SEED_PROMPTS } from './prompts'
export { SEED_DEV_TOOLS } from './dev-tools'
export { SEED_REPOS } from './repos'
export { SEED_COURSES } from './courses'
export { SEED_OFFERS } from './offers'
export { SEED_COMMENTS } from './comments'
"""
open(os.path.join(OUT, 'index.ts'), 'w').write(index_src)
print("wrote lib/seed/index.ts")

os.remove(SRC)
print("removed lib/seed.ts")
