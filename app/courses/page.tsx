import type { Metadata } from 'next'
import { CoursesView } from '@/components/listing/CoursesView'

export const metadata: Metadata = {
  title: 'Learning Courses',
  description: 'Roadmaps and learning paths for software developers.',
}

export default function CoursesPage() {
  return <CoursesView />
}
