import { createFileRoute } from '@tanstack/react-router'

import { Activities } from '@/components/roots/Activities'
import { Faq } from '@/components/roots/Faq'
import { Hero } from '@/components/roots/Hero'
import { Lineup } from '@/components/roots/Lineup'
import { Merchandise } from '@/components/roots/Merchandise'
import { SiteFooter } from '@/components/roots/SiteFooter'
import { SiteHeader } from '@/components/roots/SiteHeader'
import { Tickets } from '@/components/roots/Tickets'
import { Timeline } from '@/components/roots/Timeline'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Lineup />
        <Activities />
        <Timeline />
        <Merchandise />
        <Faq />
        <Tickets />
      </main>
      <SiteFooter />
    </>
  )
}
