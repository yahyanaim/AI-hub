'use client'

import { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'
import { relativeTime } from '@/lib/utils'

export function CommentThread({ itemId }: { itemId: string }) {
  const { getComments, addComment, currentUser, getUser, setAuthModalOpen } =
    useApp()
  const comments = getComments(itemId)
  const [body, setBody] = useState('')

  const submit = () => {
    if (!currentUser) {
      setAuthModalOpen(true)
      return
    }
    if (!body.trim()) return
    addComment(itemId, body)
    setBody('')
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-heading text-lg font-semibold">
          Discussion
        </h3>
        <span className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground">
          {comments.length}
        </span>
      </div>

      {/* Composer */}
      <div className="mb-6 flex gap-3">
        <Avatar
          name={currentUser?.displayName ?? 'Guest'}
          src={currentUser?.avatarUrl}
          size={36}
        />
        <div className="flex-1">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={
              currentUser ? 'Share your thoughts…' : 'Sign in to comment…'
            }
            rows={3}
            className="input resize-y"
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit()
            }}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {currentUser ? '⌘+Enter to send' : ''}
            </span>
            <button
              onClick={submit}
              disabled={!body.trim()}
              className="btn-primary"
            >
              <Send className="h-4 w-4" />
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      {comments.length === 0 ? (
        <div className="rounded-md border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
          No comments yet. Be the first!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => {
            const author = getUser(c.userId)
            return (
              <div key={c.id} className="flex gap-3">
                <Avatar
                  name={author?.displayName ?? '?'}
                  src={author?.avatarUrl}
                  size={36}
                />
                <div className="flex-1">
                  <div className="rounded-md border border-border bg-muted p-3">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {author?.displayName ?? 'Unknown'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        @{author?.username ?? 'unknown'}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {relativeTime(c.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
