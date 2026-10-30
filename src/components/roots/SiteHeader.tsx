import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { scrollToId } from './styles'

const NAV = [
  { id: 'line-up', label: 'Line up' },
  { id: 'hoat-dong', label: 'Hoạt động' },
  { id: 'music-concert', label: 'Music concert' },
  { id: 'faq', label: 'FAQ' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(id: string) {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none',
        scrolled
          ? 'bg-[#f3dfc2]/90 shadow-sm backdrop-blur-md'
          : 'bg-[#f0d3ad]/45 backdrop-blur-[2px]',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1366px] items-center justify-between px-4 sm:px-8 md:h-[4.75rem]">
        <a href="#top" aria-label="ROOTS Festival – về đầu trang" className="shrink-0">
          <img src="/img/logo-vr.svg" alt="Viet Roots Collective" width={256} height={159} className="h-10 w-auto md:h-14" />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-12 md:flex lg:gap-16">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(item.id)
              }}
              className="text-[15px] font-bold tracking-wide text-roots-deep uppercase transition-colors hover:text-roots-red"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#dat-ve"
            onClick={(e) => {
              e.preventDefault()
              go('dat-ve')
            }}
            className="border-2 border-roots-deep px-5 py-2 text-sm text-roots-deep uppercase transition-colors hover:bg-roots-brown hover:text-roots-cream md:px-8 md:py-3 md:text-base"
          >
            Xem vé
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center text-roots-deep md:hidden"
              aria-label="Mở menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="paper-bg w-72 border-roots-sand">
              <SheetTitle className="px-6 pt-6 font-display text-2xl text-roots-brown">
                ROOTS Festival
              </SheetTitle>
              <SheetDescription className="px-6 text-roots-brown/70">
                19–20.06.2027 • Ninh Thuận
              </SheetDescription>
              <nav aria-label="Điều hướng di động" className="flex flex-col px-6 py-4">
                {[...NAV, { id: 'lich-trinh', label: 'Lịch trình' }, { id: 'merchandise', label: 'Merchandise' }].map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(item.id)}
                      className="border-b border-roots-sand py-3 text-left font-bold tracking-wide text-roots-deep uppercase"
                    >
                      {item.label}
                    </button>
                  ),
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
