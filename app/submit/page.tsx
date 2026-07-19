import type { Metadata } from 'next'
import { SubmitForm } from '@/components/submit/SubmitForm'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Submit a Tool or Resource',
  description: 'Submit an AI tool, developer tool, open-source repo, or coding course to the AI Hunt community. New submissions are reviewed before going live.',
  alternates: { canonical: `${baseUrl}/submit` },
}

export default function SubmitPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
          Contribute
        </div>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Share with the community
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Submit a tool, dev tool, or repo. New entries are reviewed before going live.
        </p>
      </div>
      <SubmitForm />
    </div>
  )
}
