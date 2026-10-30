import { useEffect, useState } from 'react'

import { EVENT, img } from '@/data/festival'
import { btnDark, btnLight, scrollToId } from './styles'

const START = new Date(EVENT.startsAt).getTime()
const END = new Date(EVENT.endsAt).getTime()

function useNow() {
  // null trên server để HTML khớp lúc hydrate; bắt đầu đếm sau khi mount.
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function Countdown() {
  const now = useNow()
  const diff = now === null ? null : Math.max(0, START - now)
  const parts =
    diff === null
      ? null
      : {
          days: Math.floor(diff / 86_400_000),
          hours: Math.floor((diff / 3_600_000) % 24),
          minutes: Math.floor((diff / 60_000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        }
  const live = now !== null && now >= START && now < END
  const ended = now !== null && now >= END

  const cells: [string, number | undefined][] = [
    ['Ngày', parts?.days],
    ['Giờ', parts?.hours],
    ['Phút', parts?.minutes],
    ['Giây', parts?.seconds],
  ]

  return (
    <div className="relative mx-auto mt-8 w-full max-w-[1132px] border-y border-roots-maroon/50 bg-[#fdf7ea]/75 px-5 py-6 backdrop-blur-[1px] sm:px-12 md:mt-8 md:py-8">
      <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-8">
        <div className="text-center md:text-left">
          <p className="text-sm tracking-wide text-roots-orange uppercase md:text-base">The countdown</p>
          <p className="mt-1 text-xl font-bold tracking-wide text-roots-maroon uppercase md:text-[28px]">
            {live ? 'ROOTS đang diễn ra' : ended ? 'Hẹn gặp lại tại ROOTS' : 'Hẹn gặp nhau tại ROOTS'}
          </p>
        </div>

        {!live && !ended && (
          <div
            role="timer"
            aria-live="off"
            aria-label="Thời gian còn lại đến ROOTS Festival"
            className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3 md:w-auto"
          >
            {cells.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col items-center border border-roots-maroon/30 bg-roots-brown px-1 py-3 text-roots-cream sm:px-4 md:min-w-[92px]"
              >
                <span className="font-display text-2xl leading-none tabular-nums sm:text-3xl md:text-4xl">
                  {value === undefined ? '--' : String(value).padStart(2, '0')}
                </span>
                <span className="mt-1.5 text-[11px] tracking-widest text-roots-sand uppercase sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-roots-cream bg-cover bg-center pt-24 pb-10 md:pt-32 md:pb-5"
      style={{ backgroundImage: `url(${img('/img/hero-bg.jpg', 1920)})` }}
    >
      <div className="relative mx-auto flex max-w-[1366px] flex-col items-center px-4 text-center sm:px-8">
        <p className="text-xs tracking-wide text-roots-maroon uppercase sm:text-[15px]">
          Lễ hội văn hoá • Nghệ thuật • Âm nhạc
        </p>
        <h1 className="mt-4 md:mt-5">
          <img
            src="/img/logo-roots.png"
            alt="ROOTS Festival – Return to where it all begins"
            width={520}
            height={185}
            fetchPriority="high"
            className="h-auto w-[300px] sm:w-[400px] md:w-[520px]"
          />
        </h1>
        <p className="mt-6 max-w-[1000px] text-[13px] leading-relaxed text-roots-maroon sm:text-[15px]">
          Nơi di sản bản địa hòa quyện cùng hơi thở đương đại thông qua âm nhạc, nghệ thuật và sức sáng tạo
          của thế hệ trẻ, ROOTS mang đến hành trình{' '}
          <strong className="font-bold">
            chạm vào di sản, kết nối cộng đồng và lan tỏa những giá trị văn hóa nguyên bản
          </strong>
        </p>
        <img
          src="/img/hero-date.png"
          alt="19–20.06.2027 • Ninh Thuận"
          width={420}
          height={48}
          className="mt-7 h-auto w-[270px] sm:w-[420px]"
        />
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-5">
          <button type="button" onClick={() => scrollToId('line-up')} className={`${btnDark} sm:min-w-[230px]`}>
            Khám phá ROOTS
          </button>
          <button type="button" onClick={() => scrollToId('dat-ve')} className={`${btnLight} sm:min-w-[230px]`}>
            Xem hạng vé
          </button>
        </div>
        <Countdown />
      </div>
    </section>
  )
}
