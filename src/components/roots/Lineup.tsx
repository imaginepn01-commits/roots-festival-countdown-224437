import { useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ARTISTS, img, type Artist } from '@/data/festival'
import { btnPill, scrollToId } from './styles'

export function Lineup() {
  const [active, setActive] = useState<Artist | null>(null)

  return (
    <section id="line-up" className="relative overflow-hidden bg-roots-brown pt-16 pb-10 md:pt-20">
      <div className="mx-auto max-w-[1366px] px-4 sm:px-8 lg:px-[78px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
          <h2 className="shrink-0">
            <img src="/img/heading-lineup.png" alt="Line up" width={245} height={54} className="h-auto w-[180px] md:w-[245px]" />
          </h2>
          <div>
            <p className="text-xl tracking-wide text-roots-cream uppercase md:text-[28px]">
              Những thanh âm của thế hệ hôm nay
            </p>
            <p className="mt-2 max-w-[680px] text-xs leading-relaxed text-roots-cream/80 md:text-[13px]">
              Tại ROOTS Festival 2027, âm nhạc trở thành cầu nối giữa di sản và thế hệ trẻ. Line-up quy tụ những
              nghệ sĩ mang màu sắc âm nhạc đa dạng, từ pop, indie, R&amp;B đến những chất liệu đương đại giàu bản
              sắc, cùng tạo nên một hành trình cảm xúc xuyên suốt hai ngày festival.
            </p>
          </div>
        </div>

        <p className="sr-only">Artist line-up</p>
        <ul className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-x-12 lg:gap-y-8">
          {ARTISTS.map((artist) => (
            <li key={artist.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[228px]">
              <button
                type="button"
                onClick={() => setActive(artist)}
                aria-label={`Xem giới thiệu ${artist.name}`}
                className="group block w-full overflow-hidden rounded-[3px] shadow-lg shadow-black/30 transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-roots-sand focus-visible:ring-offset-2 focus-visible:ring-offset-roots-brown focus-visible:outline-none motion-reduce:transition-none"
              >
                <ArtistPhoto artist={artist} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[92dvh] overflow-y-auto border-roots-sand bg-roots-cream p-0 sm:max-w-3xl">
          {active && (
            <div className="grid md:grid-cols-[minmax(0,300px)_1fr]">
              <div className="bg-roots-brown">
                <ArtistPhoto artist={active} large />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] text-roots-orange uppercase">{active.genre}</p>
                <DialogTitle className="mt-2 font-display text-3xl leading-tight font-semibold text-roots-brown uppercase md:text-4xl">
                  {active.name}
                </DialogTitle>
                <DialogDescription className="mt-4 text-[15px] leading-relaxed text-roots-brown/85">
                  {active.bio}
                </DialogDescription>
                <p className="mt-6 border-t border-roots-sand pt-4 text-sm text-roots-brown/80">
                  Biểu diễn tại <strong>ROOTS Music Concert</strong> · 20/06/2027 · Sân khấu chính
                </p>
                <button
                  type="button"
                  className={`${btnPill} mt-6`}
                  onClick={() => {
                    setActive(null)
                    window.setTimeout(() => scrollToId('lich-trinh'), 320)
                  }}
                >
                  Xem lịch hoạt động
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function ArtistPhoto({ artist, large = false }: { artist: Artist; large?: boolean }) {
  if (!artist.image) {
    // Chưa có ảnh trong bộ thiết kế — thẻ giữ chỗ cùng phong cách, thay khi có ảnh chính thức.
    return (
      <div className="relative flex aspect-[221/279] w-full flex-col items-center justify-end bg-gradient-to-b from-[#c46a3a] via-[#7a2e22] to-roots-deep pb-4">
        <span className="absolute inset-0 flex items-center justify-center font-display text-7xl text-roots-sand/35">
          {artist.name
            .split(' ')
            .map((w) => w[0])
            .slice(-2)
            .join('')}
        </span>
        <span className="relative text-sm font-bold tracking-wide text-roots-cream uppercase drop-shadow md:text-[17px]">
          {artist.name}
        </span>
      </div>
    )
  }
  return (
    <img
      src={img(artist.image, large ? 600 : 460)}
      alt={artist.name}
      width={221}
      height={279}
      loading="lazy"
      className="aspect-[221/279] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
    />
  )
}
