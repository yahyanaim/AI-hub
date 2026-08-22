import type {
  Comment
} from '@/types'

import { daysAgo } from './_shared'

export const SEED_COMMENTS: Comment[] = [
  {
    id: 'c1',
    itemId: 't1',
    userId: 'u2',
    body: 'The codebase-aware chat is genuinely a step change. Tab completion alone saved me hours this week.',
    createdAt: daysAgo(3),
  },
  {
    id: 'c2',
    itemId: 't1',
    userId: 'u4',
    body: 'Composer for multi-file refactors is the killer feature for me. Watch context limits on big repos though.',
    createdAt: daysAgo(2),
  },
  {
    id: 'c4',
    itemId: 'r1',
    userId: 'u5',
    body: 'Abstraction overhead is real — reach for it on real orchestration, not single calls. LangGraph is great for agents.',
    createdAt: daysAgo(5),
  },
]
