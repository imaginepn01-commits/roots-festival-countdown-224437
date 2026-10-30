import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { ACTIVITIES, img, type Activity } from '@/data/festival'
import { cn } from '@/lib/utils'
import { ActivityDialog } from './ActivityDialog'
import { btnPill } from './styles'

const CULTURE = ACTIVITIES.filter((a) => a.group === 'culture')
const FOOD = ACTIVITIES.filter((a) => a.group === 'food' && a.id !== 'booth-nha-tai-tro')
const SPONSOR = ACTIVITIES.find((a) => a.id === 'booth-nha-tai-tro')!
const CONCERT = ACTIVITIES.filter((a) => a.group === 'concert')

export function Activities() {
  const [active, setActive] = useState<Activity | null>(null)

  return (
    <>
      <section id="hoat-dong" aria-labelledby="hoat-dong-title" className="bg-roots-brown">
        <div className="mx-auto max-w-[1366px] px-4 pt-6 pb-8 text-center sm:px-8 md:pt-10">
          <p className="text-xs tracking-[0.3em] text-roots-sand uppercase">Các hoạt động</p>
          <h2 id="hoat-dong-title" className="mt-2 text-lg tracking-wide text-roots-cream uppercase md:text-2xl">
            Một ngày tại ROOTS – từ cội nguồn đến thanh âm
          </h2>
          <p className="mt-3 font-display text-sm text-roots-sand/90 italic md:text-base">
            A. Chạm vào văn hóa Chăm · Những trải nghiệm nổi bật
          </p>
        </div>
        <ActivitySlider items={CULTURE} onOpen={setActive} />
      </section>

      <FoodAndFun onOpen={setActive} />
      <Concert onOpen={setActive} />

      <ActivityDialog activity={active} onClose={() => setActive(null)} />
    </>
  )
}

function ActivitySlider({ items, onOpen }: { items: Activity[]; onOpen: (a: Activity) => void }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (i: number) => {
      const el = track.current
      if (!el) return
      const next = Math.max(0, Math.min(items.length - 1, i))
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    },
    [items.length],
  )

  useEffect(() => {
    const el = track.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hoạt động văn hóa Chăm"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goTo(index + 1)
        if (e.key === 'ArrowLeft') goTo(index - 1)
      }}
    >
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="w-full shrink-0 snap-start"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${items.length}: ${item.title}`}
          >
            <button
              type="button"
              onClick={() => onOpen(item)}
              aria-label={`Chi tiết hoạt động: ${item.title}`}
              className="group relative block aspect-[1366/768] w-full overflow-hidden focus-visible:outline-none"
            >
              <img
                src={img(item.image, 1600)}
                srcSet={`${img(item.image, 800)} 800w, ${img(item.image, 1366)} 1366w, ${img(item.image, 1920)} 1920w`}
                sizes="100vw"
                alt={item.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              {/* Overlay khi hover (desktop) */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-3 items-end justify-between gap-4 p-8 opacity-0 transition-all duration-500 md:flex md:group-hover:translate-y-0 md:group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                <span className="font-display text-2xl text-roots-cream uppercase drop-shadow-lg">{item.title}</span>
                <span className="inline-flex items-center gap-2 border border-roots-cream/80 bg-roots-brown/70 px-5 py-2.5 text-sm tracking-widest text-roots-cream uppercase">
                  Khám phá <ArrowRight className="size-4" />
                </span>
              </span>
              {item.hotspot ? (
                // Nút “Chi tiết hoạt động” vốn nằm sẵn trong ảnh thiết kế — làm nổi nhẹ khi hover.
                <span
                  aria-hidden
                  className="pointer-events-none absolute rounded-md ring-roots-orange/0 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-roots-sand"
                  style={{
                    left: `${item.hotspot.left}%`,
                    top: `${item.hotspot.top}%`,
                    width: `${item.hotspot.width}%`,
                    height: `${item.hotspot.height}%`,
                  }}
                />
              ) : (
                <span
                  aria-hidden
                  className={`${btnPill} pointer-events-none absolute right-[6%] bottom-[10%] text-xs sm:text-base lg:text-xl`}
                >
                  Chi tiết hoạt động
                </span>
              )}
            </button>
          </div>
        ))}
      </div>

      <SliderArrow side="left" disabled={index === 0} onClick={() => goTo(index - 1)} />
      <SliderArrow side="right" disabled={index === items.length - 1} onClick={() => goTo(index + 1)} />

      <div className="flex items-center justify-center gap-2.5 py-5">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Đến hoạt động ${i + 1}: ${item.title}`}
            aria-current={i === index}
            className={cn(
              'h-2 rounded-full transition-all duration-300 motion-reduce:transition-none',
              i === index ? 'w-8 bg-roots-sand' : 'w-2 bg-roots-sand/40 hover:bg-roots-sand/70',
            )}
          />
        ))}
      </div>
    </div>
  )
}

function SliderArrow({
  side,
  disabled,
  onClick,
}: {
  side: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === 'left' ? 'Hoạt động trước' : 'Hoạt động tiếp theo'}
      className={cn(
        'absolute top-[calc(50%-1.75rem)] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-roots-cream/70 bg-roots-brown/60 text-roots-cream backdrop-blur-sm transition-opacity hover:bg-roots-brown/85 disabled:pointer-events-none disabled:opacity-0 sm:size-12 motion-reduce:transition-none',
        side === 'left' ? 'left-2 sm:left-5' : 'right-2 sm:right-5',
      )}
    >
      <Icon className="size-5 sm:size-6" />
    </button>
  )
}

/** Thẻ hoạt động tương tác: hover trên desktop, chạm để mở chi tiết trên mobile. */
function ActivityCard({
  activity,
  onOpen,
  framed = false,
  label,
}: {
  activity: Activity
  onOpen: (a: Activity) => void
  framed?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(activity)}
      aria-label={`Chi tiết hoạt động: ${activity.title}`}
      className={cn(
        'group relative block w-full overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-roots-orange focus-visible:ring-offset-2 focus-visible:outline-none',
        framed && 'border-[7px] border-[#8a6a4f] shadow-[6px_8px_10px_rgb(61_34_31/0.35)] outline outline-1 -outline-offset-[11px] outline-[#e8c98d]',
      )}
    >
      <img
        src={img(activity.image, 720)}
        alt={activity.title}
        loading="lazy"
        className="aspect-[349/196] w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105 motion-reduce:transition-none"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-roots-deep/75 via-roots-deep/10 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 motion-reduce:transition-none" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 flex-col items-start gap-2 p-4 opacity-0 transition-all duration-500 md:flex md:group-hover:translate-y-0 md:group-hover:opacity-100 motion-reduce:transition-none">
        {label && <span className="font-display text-lg text-roots-cream">{label}</span>}
        <span className="inline-flex items-center gap-1.5 border border-roots-cream/80 px-3 py-1 text-xs tracking-widest text-roots-cream uppercase">
          Khám phá <ArrowRight className="size-3.5" />
        </span>
      </span>
    </button>
  )
}

function FoodAndFun({ onOpen }: { onOpen: (a: Activity) => void }) {
  return (
    <section aria-labelledby="food-title" className="bg-[#faf4e4]">
      <div className="mx-auto max-w-[1366px] px-4 pt-14 sm:px-8 md:pt-20 lg:px-[60px]">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-roots-orange uppercase">B. Vui chơi &amp; Ẩm thực</p>
          <h2 id="food-title" className="mt-3">
            <img src="/img/heading-food.png" alt="Vui chơi & Ẩm thực" width={626} height={86} className="mx-auto h-auto w-[300px] sm:w-[480px] md:w-[626px]" />
          </h2>
          <p className="mt-4 font-display text-lg text-roots-maroon italic">
            Ăn một chút. Chơi một chút. Khám phá Ninh Thuận nhiều hơn một chút.
          </p>
          <p className="mx-auto mt-3 max-w-reading text-[15px] leading-relaxed text-roots-brown/80">
            Giữa những hoạt động văn hóa và âm nhạc, khu vực Food &amp; Fun là nơi bạn có thể nghỉ chân, gặp gỡ bạn
            bè và khám phá thêm những trải nghiệm thú vị của ROOTS. Khu ẩm thực mang đến các món ăn, thức uống và
            những hương vị mang màu sắc địa phương.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-3 md:gap-[75px]">
          {FOOD.map((item) => (
            <li key={item.id}>
              <ActivityCard activity={item} onOpen={onOpen} framed />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => onOpen(SPONSOR)}
        aria-label="Chi tiết: Booth nhà tài trợ"
        className="group relative mx-auto mt-6 block w-full max-w-[1366px] overflow-hidden focus-visible:ring-2 focus-visible:ring-roots-orange focus-visible:outline-none"
      >
        <img
          src={img(SPONSOR.image, 1366)}
          alt="Booth nhà tài trợ: BIDV, Vinpearl, Coca-Cola, Hảo Hảo, Grab, TTC Hospitality, NTV"
          loading="lazy"
          className="aspect-[1366/300] w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <span className="pointer-events-none absolute bottom-[14%] left-[10%] hidden translate-y-2 items-center gap-1.5 border border-roots-maroon/70 px-3 py-1 text-xs tracking-widest text-roots-maroon uppercase opacity-0 transition-all duration-500 md:inline-flex md:group-hover:translate-y-0 md:group-hover:opacity-100">
          Khám phá <ArrowRight className="size-3.5" />
        </span>
      </button>
    </section>
  )
}

function Concert({ onOpen }: { onOpen: (a: Activity) => void }) {
  return (
    <section
      id="music-concert"
      aria-labelledby="concert-title"
      className="relative overflow-hidden bg-roots-deep bg-cover bg-center"
      style={{ backgroundImage: `url(${img('/img/concert-stage.jpg', 1600)})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-roots-deep/70 via-roots-deep/80 to-roots-brown" />
      <div className="relative mx-auto max-w-[1366px] px-4 py-16 sm:px-8 md:py-24 lg:px-[78px]">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] text-roots-sand uppercase">C. ROOTS Music Concert</p>
          <h2 id="concert-title" className="mt-3 font-display text-3xl leading-tight text-roots-cream uppercase md:text-5xl">
            Khi cội nguồn hòa cùng nhịp điệu hôm nay
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-roots-cream/85 md:text-base">
            Khi mặt trời dần xuống, ROOTS bước vào chương sôi động nhất của hành trình. Sân khấu chính trở thành
            nơi âm thanh bản địa, chất liệu văn hóa Chăm và âm nhạc đương đại gặp nhau, cùng những màn trình diễn
            đến từ dàn nghệ sĩ của ROOTS Festival 2027.
          </p>
        </div>

        <h3 className="mt-12 text-sm tracking-[0.2em] text-roots-sand uppercase">Chờ đón tại ROOTS Music Concert</h3>
        <ul className="mt-5 grid gap-6 md:grid-cols-3">
          {CONCERT.map((item) => (
            <li key={item.id} className="flex flex-col overflow-hidden border border-roots-sand/30 bg-roots-brown/70 backdrop-blur-sm">
              <ActivityCard activity={item} onOpen={onOpen} />
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="group flex flex-1 flex-col p-5 text-left"
              >
                <span className="font-display text-xl text-roots-cream uppercase transition-transform duration-300 md:group-hover:translate-x-1 motion-reduce:transition-none">
                  {item.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-roots-cream/75">{item.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-widest text-roots-sand uppercase">
                  Khám phá <ArrowRight className="size-3.5" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
