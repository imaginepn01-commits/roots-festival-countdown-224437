import { EVENT } from '@/data/festival'

export function SiteFooter() {
  return (
    <footer className="bg-roots-deep py-10 text-roots-cream/75">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-4 px-4 text-center text-sm sm:px-8 md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <img src="/img/logo-vr.png" alt="Viet Roots Collective" width={86} height={64} loading="lazy" className="h-10 w-auto invert" />
          <div>
            <p className="font-display text-base text-roots-cream">ROOTS Festival 2027</p>
            <p>
              {EVENT.dateLabel} · {EVENT.venue}
            </p>
          </div>
        </div>
        <p className="text-xs text-roots-cream/55">Một festival để nghe. Một vùng đất để chạm. Một câu chuyện để mang về.</p>
      </div>
    </footer>
  )
}
