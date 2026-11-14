import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { ADMIN_COOKIE, verifyAdminJwt } from '@/lib/server/auth'
import { AdminBadge } from '@/components/profile/AdminBadge'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const admin = await verifyAdminJwt(token)

  if (!admin) {
    redirect('/admin/login')
  }

  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-heading text-xl font-bold leading-tight">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Signed in as {admin.name}
            </p>
          </div>
        </div>

        <AdminBadge username="yahianaim" />
      </div>
    </div>
  )
}
