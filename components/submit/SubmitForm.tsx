'use client'

import { useState, useEffect } from 'react'
import { DonationGate } from './DonationGate'
import { useRouter } from 'next/navigation'
import {
  Wrench,
  TerminalSquare,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Link2,
  Sparkles,
  Share2,
  Globe,
  Star,
  Package,
} from 'lucide-react'
import { useApp } from '@/lib/store'
import { cn, slugify } from '@/lib/utils'
import type { ItemType, Pricing, ToolCategory, DevToolCategory, EditToolCategory } from '@/types'
import {
  TOOL_CATEGORY_LABELS,
  DEVTOOL_CATEGORY_LABELS,
  REPO_CATEGORY_LABELS,
} from '@/types'

type Step = 0 | 1 | 2 | 3

interface FormState {
  type: ItemType | null
  // tool
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: string
  tags: string[]
  pricing: Pricing
}

const STEPS = ['Type', 'Source', 'Details', 'Review'] as const

export function SubmitForm() {
  const router = useRouter()
  const { submitTool, submitDevTool, submitRepo, currentUser, setAuthModalOpen } =
    useApp()
  const [showDonation, setShowDonation] = useState(false)
  const [pendingSubmit, setPendingSubmit] = useState(false)
  const [step, setStep] = useState<Step>(0)
  const [fetching, setFetching] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [submitted, setSubmitted] = useState<{
    type: ItemType
    slug: string
  } | null>(null)

  const [form, setForm] = useState<FormState>({
    type: null,
    name: '',
    tagline: '',
    description: '',
    url: '',
    logoUrl: '',
    category: 'coding',
    tags: [],
    pricing: 'free',
  })

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const canAdvance = (): boolean => {
    if (step === 0) return !!form.type
    if (step === 1) {
      if (form.type === 'tool') return !!form.url && !!form.name
      if (form.type === 'devtool') return !!form.url && !!form.name
      if (form.type === 'repo') return !!form.url && !!form.name
    }
    if (step === 2) {
      if (form.type === 'tool')
        return !!form.tagline && !!form.description && !!form.category
      if (form.type === 'devtool')
        return !!form.tagline && !!form.description && !!form.category
      if (form.type === 'repo')
        return !!form.tagline && !!form.description && !!form.category
    }
    return true
  }

  // Simulated metadata auto-fetch
  const fetchMetadata = async () => {
    if (form.type === 'tool' && form.url) {
      setFetching(true)
      // Simulate OG fetch with derived values
      await new Promise((r) => setTimeout(r, 900))
      const domain = (() => {
        try {
          return new URL(form.url).hostname.replace('www.', '')
        } catch {
          return form.url
        }
      })()
      const pretty = domain.split('.')[0]
      set('name', form.name || pretty.charAt(0).toUpperCase() + pretty.slice(1))
      set('logoUrl', `https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
      setFetching(false)
    } else if (form.type === 'devtool' && form.url) {
      setFetching(true)
      await new Promise((r) => setTimeout(r, 900))
      const domain = (() => {
        try {
          return new URL(form.url).hostname.replace('www.', '')
        } catch {
          return form.url
        }
      })()
      const pretty = domain.split('.')[0]
      set('name', form.name || pretty.charAt(0).toUpperCase() + pretty.slice(1))
      set('logoUrl', `https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
      setFetching(false)
    }
  }

  const addTag = () => {
    const t = slugify(tagInput)
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    setTagInput('')
  }

  const handleSubmit = () => {
    if (!currentUser) {
      setAuthModalOpen(true)
      return
    }
    setShowDonation(true)
    setPendingSubmit(true)
    return
  }

  const finishSubmit = () => {
    setShowDonation(false)
    if (form.type === 'tool') {
      const tool = submitTool({
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        url: form.url,
        logoUrl: form.logoUrl,
        category: form.category as ToolCategory,
        tags: form.tags,
        pricing: form.pricing,
      })
      setSubmitted({ type: 'tool', slug: tool.slug })
    } else if (form.type === 'devtool') {
      const devTool = submitDevTool({
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        url: form.url,
        logoUrl: form.logoUrl,
        category: form.category as DevToolCategory,
        tags: form.tags,
        pricing: form.pricing,
      })
      setSubmitted({ type: 'devtool', slug: devTool.slug })
    } else if (form.type === 'repo') {
      const repo = submitRepo({
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        url: form.url,
        logoUrl: form.logoUrl,
        category: form.category as EditToolCategory,
        tags: form.tags,
        pricing: form.pricing,
      })
      setSubmitted({ type: 'repo', slug: repo.slug })
    }
    setStep(3)
  }

  // -------- Donation modal --------
  useEffect(() => {
    if (!showDonation) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [showDonation])

  // -------- Success state --------
  if (submitted) {
    return (
      <SuccessState
        type={submitted.type}
        slug={submitted.slug}
        onView={() => {
          if (submitted.type === 'devtool') router.push(`/devtool/${submitted.slug}`)
          else if (submitted.type === 'repo') router.push(`/edittools/${submitted.slug}`)
          else router.push(`/${submitted.type}s/${submitted.slug}`)
        }}
        onAnother={() => {
          setSubmitted(null)
          setStep(0)
          setForm({
            ...form,
            type: null,
            name: '',
            tagline: '',
            description: '',
            url: '',
            logoUrl: '',
            tags: [],


          })
        }}
      />
    )
  }

  return (
    <>
      {showDonation && (
        <DonationGate onDismiss={finishSubmit} />
      )}
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  i < step
                    ? 'border-accent bg-accent text-white'
                    : i === step
                      ? 'border-accent text-accent shadow-[0_0_16px_var(--accent-glow)]'
                      : 'border-border text-muted-foreground'
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'mt-1.5 text-xs font-medium',
                  i === step ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-px flex-1 transition-colors',
                  i < step ? 'bg-accent' : 'bg-border'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-muted p-6 md:p-8">
        {/* STEP 0: type selector */}
        {step === 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold">
              What are you submitting?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a category to get started.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {(
                [
                  {
                    type: 'tool',
                    icon: Wrench,
                    title: 'AI Tool',
                    desc: 'A product or service',
                  },

                  {
                    type: 'devtool',
                    icon: Package,
                    title: 'Dev Tool',
                    desc: 'A library, framework, or CLI',
                  },

                  {
                    type: 'repo',
                    icon: Share2,
                    title: 'Editing Tool',
                    desc: 'A PDF, image, video, or design tool',
                  },
                ] as const
              ).map(({ type, icon: Icon, title, desc }) => (
                <button
                  key={type}
                  onClick={() => set('type', type)}
                  className={cn(
                    'flex flex-col items-start rounded-md border p-4 text-left transition-all',
                    form.type === type
                      ? 'border-accent bg-accent/5 shadow-[0_0_20px_var(--accent-glow)]'
                      : 'border-border bg-card hover:border-ring'
                  )}
                >
                  <Icon
                    className={cn(
                      'mb-3 h-6 w-6',
                      form.type === type ? 'text-accent' : 'text-muted-foreground'
                    )}
                  />
                  <span className="font-heading text-sm font-semibold">{title}</span>
                  <span className="mt-0.5 text-xs text-muted-foreground">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: source */}
        {step === 1 && (
          <div>
            <h2 className="font-heading text-lg font-semibold">
              {form.type === 'tool' && 'Tool URL'}
              {form.type === 'devtool' && 'Dev Tool URL'}
              {form.type === 'repo' && 'Editing Tool URL'}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {form.type === 'tool' &&
                'We’ll auto-fetch the logo and metadata from the page.'}
              {form.type === 'devtool' &&
                'We’ll auto-fetch the logo and metadata from the page.'}
              {form.type === 'repo' &&
                'We’ll auto-fetch the logo and metadata from the page.'}
            </p>

            <div className="mt-6 space-y-4">
              {(form.type === 'tool' || form.type === 'devtool' || form.type === 'repo') && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Website URL
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          value={form.url}
                          onChange={(e) => set('url', e.target.value)}
                          placeholder="https://example.com"
                          className="input pl-9"
                          type="url"
                        />
                      </div>
                      <button
                        onClick={fetchMetadata}
                        disabled={!form.url || fetching}
                        className="btn-secondary"
                      >
                        {fetching ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Fetch
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tool name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="e.g. Cursor"
                      className="input"
                    />
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        {/* STEP 2: details */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-semibold">Details</h2>

            {form.type === 'tool' && (
              <>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tagline (≤ 80 chars)
                  </label>
                  <input
                    value={form.tagline}
                    onChange={(e) => set('tagline', e.target.value)}
                    placeholder="A one-line pitch"
                    maxLength={80}
                    className="input"
                  />
                  <span className="mt-1 block text-right text-xs text-muted-foreground">
                    {form.tagline.length}/80
                  </span>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description (markdown supported)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe what it does, key features, who it's for…"
                    rows={5}
                    className="input resize-y"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => set('category', e.target.value)}
                      className="input"
                    >
                      {Object.entries(TOOL_CATEGORY_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pricing
                    </label>
                    <select
                      value={form.pricing}
                      onChange={(e) => set('pricing', e.target.value as Pricing)}
                      className="input"
                    >
                      <option value="free">Free</option>
                      <option value="freemium">Freemium</option>
                      <option value="paid">Paid</option>
                      <option value="open-source">Open Source</option>
                    </select>
                  </div>
                </div>
                <TagInput
                  label="Tags"
                  items={form.tags}
                  input={tagInput}
                  setInput={setTagInput}
                  onAdd={addTag}
                  onRemove={(t) => set('tags', form.tags.filter((x) => x !== t))}
                  placeholder="coding, ai, editor"
                />
              </>
            )}

            {form.type === 'devtool' && (
              <>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tagline (≤ 80 chars)
                  </label>
                  <input
                    value={form.tagline}
                    onChange={(e) => set('tagline', e.target.value)}
                    placeholder="A one-line pitch"
                    maxLength={80}
                    className="input"
                  />
                  <span className="mt-1 block text-right text-xs text-muted-foreground">
                    {form.tagline.length}/80
                  </span>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description (markdown supported)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe what it does, key features, who it's for…"
                    rows={5}
                    className="input resize-y"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => set('category', e.target.value)}
                      className="input"
                    >
                      {Object.entries(DEVTOOL_CATEGORY_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pricing
                    </label>
                    <select
                      value={form.pricing}
                      onChange={(e) => set('pricing', e.target.value as Pricing)}
                      className="input"
                    >
                      <option value="free">Free</option>
                      <option value="freemium">Freemium</option>
                      <option value="paid">Paid</option>
                      <option value="open-source">Open Source</option>
                    </select>
                  </div>
                </div>
                <TagInput
                  label="Tags"
                  items={form.tags}
                  input={tagInput}
                  setInput={setTagInput}
                  onAdd={addTag}
                  onRemove={(t) => set('tags', form.tags.filter((x) => x !== t))}
                  placeholder="framework, library, cli"
                />
              </>
            )}

            {form.type === 'repo' && (
              <>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tagline (&le; 80 chars)
                  </label>
                  <input
                    value={form.tagline}
                    onChange={(e) => set('tagline', e.target.value)}
                    placeholder="A one-line pitch"
                    maxLength={80}
                    className="input"
                  />
                  <span className="mt-1 block text-right text-xs text-muted-foreground">
                    {form.tagline.length}/80
                  </span>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description (markdown supported)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe what it does, key features, who it's for\u2026"
                    rows={5}
                    className="input resize-y"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => set('category', e.target.value)}
                      className="input"
                    >
                      {Object.entries(REPO_CATEGORY_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pricing
                    </label>
                    <select
                      value={form.pricing}
                      onChange={(e) => set('pricing', e.target.value as Pricing)}
                      className="input"
                    >
                      <option value="free">Free</option>
                      <option value="freemium">Freemium</option>
                      <option value="paid">Paid</option>
                      <option value="open-source">Open Source</option>
                    </select>
                  </div>
                </div>
                <TagInput
                  label="Tags"
                  items={form.tags}
                  input={tagInput}
                  setInput={setTagInput}
                  onAdd={addTag}
                  onRemove={(t) => set('tags', form.tags.filter((x) => x !== t))}
                  placeholder="pdf, converter, design"
                />
              </>
            )}

          </div>
        )}

        {/* STEP 3: review */}
        {step === 3 && (
          <div>
            <h2 className="font-heading text-lg font-semibold">Review &amp; submit</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New submissions enter a pending queue for review before going live in feeds.
            </p>

            <div className="mt-6 space-y-4">
              <ReviewRow label="Type" value={form.type ?? ''} />
              {form.type === 'tool' && (
                <>
                  <ReviewRow label="Name" value={form.name} />
                  <ReviewRow label="Tagline" value={form.tagline} />
                  <ReviewRow label="URL" value={form.url} />
                  <ReviewRow label="Category" value={form.category} />
                  <ReviewRow label="Pricing" value={form.pricing} />
                  <ReviewRow label="Tags" value={form.tags.join(', ')} />
                </>
              )}
              {form.type === 'devtool' && (
                <>
                  <ReviewRow label="Name" value={form.name} />
                  <ReviewRow label="Tagline" value={form.tagline} />
                  <ReviewRow label="URL" value={form.url} />
                  <ReviewRow label="Category" value={form.category} />
                  <ReviewRow label="Pricing" value={form.pricing} />
                  <ReviewRow label="Tags" value={form.tags.join(', ')} />
                </>
              )}
              {form.type === 'repo' && (
                <>
                  <ReviewRow label="Name" value={form.name} />
                  <ReviewRow label="Tagline" value={form.tagline} />
                  <ReviewRow label="URL" value={form.url} />
                  <ReviewRow label="Category" value={form.category} />
                  <ReviewRow label="Pricing" value={form.pricing} />
                  <ReviewRow label="Tags" value={form.tags.join(', ')} />
                </>
              )}
            </div>

            {!currentUser && (
              <div className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-500">
                You’ll need to sign in to submit.
              </div>
            )}
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="btn-ghost"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!canAdvance()}
              className="btn-primary"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-brand-orange/30 active:scale-[0.97]"
            >
              <Check className="h-4 w-4" />
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 border-b border-border pb-3">
      <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="flex-1 break-words text-sm text-foreground">{value || '—'}</span>
    </div>
  )
}

function TagInput({
  label,
  items,
  input,
  setInput,
  onAdd,
  onRemove,
  placeholder,
}: {
  label: string
  items: string[]
  input: string
  setInput: (v: string) => void
  onAdd: () => void
  onRemove: (t: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              onAdd()
            }
          }}
          placeholder={placeholder}
          className="input"
        />
        <button type="button" onClick={onAdd} className="btn-secondary">
          Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-sm border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground"
            >
              {t}
              <button
                onClick={() => onRemove(t)}
                className="text-muted-foreground hover:text-red-500"
                aria-label={`Remove ${t}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SuccessState({
  type,
  slug,
  onView,
  onAnother,
}: {
  type: ItemType
  slug: string
  onView: () => void
  onAnother: () => void
}) {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-brand-green/20 blur-2xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green">
          <Check className="h-8 w-8" />
        </div>
      </div>
      <h2 className="font-heading text-2xl font-semibold">Submitted!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Your {type} is in the review queue. You can view it now or share it with the community.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button onClick={onView} className="btn-primary">
          <Globe className="h-4 w-4" />
          View {type}
        </button>
        <button onClick={onAnother} className="btn-secondary">
          <Sparkles className="h-4 w-4" />
          Submit another
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
        <Star className="h-3 w-3" />
        New items start at 0 upvotes. Earn karma as the community engages!
      </div>
    </div>
  )
}
