import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { Map as MapIcon, Minus, Plus, RotateCcw, Ticket } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { EVENT, TICKETS, formatVnd } from '@/data/festival'
import { btnDark, btnLight } from './styles'

// Màu hạng vé lấy theo chú thích trên sơ đồ khu vực
const TIER_COLORS: Record<string, string> = {
  'SKY LOUNGE': '#b04d22',
  SVIP: '#e2733b',
  VIP: '#ee9a5e',
  FANZONE: '#f6e3c0',
  GA: '#f2d29f',
  CAT: '#f1b257',
}

export function Tickets() {
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <section id="dat-ve" aria-labelledby="dat-ve-title" className="relative overflow-hidden bg-roots-brown py-16 text-roots-cream md:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-roots-sand uppercase">Đặt vé ngay</p>
          <h2 id="dat-ve-title">
            <img src="/img/logo-roots.png" alt="ROOTS Festival" width={520} height={185} loading="lazy" className="mx-auto mt-4 h-auto w-[260px] md:w-[360px]" />
          </h2>
          <p className="mt-4 text-sm text-roots-cream/85 md:text-base">
            <strong className="text-roots-sand">{EVENT.dateLabel.replace('–', ' – ')}</strong> | {EVENT.venue}
          </p>
          <p className="mt-6 font-display text-xl tracking-[0.15em] text-roots-cream uppercase md:text-3xl">
            10,000+ people. One shared journey.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {TICKETS.map((t) => (
            <li key={t.tier} className="relative overflow-hidden border border-roots-sand/25 bg-roots-deep/40 p-4 sm:p-6">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: TIER_COLORS[t.tier] }} />
              <p className="text-xs tracking-[0.2em] text-roots-sand/80 uppercase">Hạng vé</p>
              <p className="mt-1 font-display text-xl text-roots-cream sm:text-2xl">{t.tier}</p>
              <p className="mt-3 text-xs tracking-[0.2em] text-roots-sand/80 uppercase">Giá vé</p>
              <p className="mt-1 text-base font-bold text-roots-sand tabular-nums sm:text-lg">{formatVnd(t.price)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <a href={EVENT.ticketUrl} target="_blank" rel="noopener noreferrer" className={`${btnLight} min-w-[260px] border-roots-sand`}>
            <Ticket className="size-4" /> Đăng ký tham dự
          </a>
          <p className="font-display text-lg text-roots-sand italic">Return to where it all begins.</p>
          <button type="button" onClick={() => setMapOpen(true)} className={`${btnDark} min-w-[260px] border-roots-sand/70`}>
            <MapIcon className="size-4" /> Xem map khu vực
          </button>
        </div>
      </div>

      <MapDialog open={mapOpen} onOpenChange={setMapOpen} />
    </section>
  )
}

const MAP_WIDTH = 484
const MAP_HEIGHT = 640
const MIN_ZOOM = 1
const MAX_ZOOM = 4

function MapDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [zoom, setZoom] = useState(1)
  const viewport = useRef<HTMLDivElement | null>(null)
  const [fit, setFit] = useState(1)

  // Tỉ lệ để sơ đồ vừa khung nhìn ở mức 100%
  const viewportRef = useCallback((el: HTMLDivElement | null) => {
    viewport.current = el
    if (!el) return
    const measure = () => {
      const pad = 16
      setFit(Math.min((el.clientWidth - pad) / MAP_WIDTH, (el.clientHeight - pad) / MAP_HEIGHT))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null)

  const clamp = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100))

  function distance() {
    const [a, b] = [...pointers.current.values()]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) pinchStart.current = { distance: distance(), zoom }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2 && pinchStart.current) {
      setZoom(clamp((pinchStart.current.zoom * distance()) / pinchStart.current.distance))
    } else if (pointers.current.size === 1 && viewport.current) {
      viewport.current.scrollLeft -= e.clientX - prev.x
      viewport.current.scrollTop -= e.clientY - prev.y
    }
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) setZoom(1)
      }}
    >
      <DialogContent className="flex h-[100dvh] w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-roots-deep p-0 text-roots-cream sm:h-[92dvh] sm:w-[94vw] sm:max-w-5xl sm:rounded-lg sm:border sm:border-roots-sand/40 [&>button:last-child]:top-3 [&>button:last-child]:right-3 [&>button:last-child]:rounded-full [&>button:last-child]:bg-roots-cream [&>button:last-child]:p-2 [&>button:last-child]:text-roots-brown [&>button:last-child]:opacity-100 [&>button:last-child>svg]:size-5">
        <div className="flex items-center gap-3 border-b border-roots-sand/20 py-3 pr-16 pl-4 sm:pl-6">
          <div className="min-w-0 flex-1">
            <DialogTitle className="font-display text-lg text-roots-cream uppercase sm:text-xl">Sơ đồ khu vực</DialogTitle>
            <DialogDescription className="truncate text-xs text-roots-sand/80">
              Sân khấu & các khu vé: SKY LOUNGE, SVIP, VIP, FANZONE, GA, CAT
            </DialogDescription>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Thu phóng sơ đồ">
            <ZoomButton label="Thu nhỏ" onClick={() => setZoom((z) => clamp(z - 0.5))} disabled={zoom <= MIN_ZOOM}>
              <Minus className="size-4" />
            </ZoomButton>
            <span className="w-12 text-center text-xs tabular-nums" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <ZoomButton label="Phóng to" onClick={() => setZoom((z) => clamp(z + 0.5))} disabled={zoom >= MAX_ZOOM}>
              <Plus className="size-4" />
            </ZoomButton>
            <ZoomButton label="Về kích thước ban đầu" onClick={() => setZoom(1)} disabled={zoom === 1}>
              <RotateCcw className="size-4" />
            </ZoomButton>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="flex min-h-0 flex-1 cursor-grab touch-none overflow-auto overscroll-contain select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 2.5))}
          onWheel={(e) => {
            if (e.ctrlKey || e.metaKey) setZoom((z) => clamp(z - e.deltaY * 0.01))
          }}
        >
          <img
            src="/img/festival-map.png"
            alt="Sơ đồ khu vực sân khấu ROOTS Festival: sân khấu, FOH, các khu SKY LOUNGE, SVIP A & B, VIP A & B, FANZONE A & B, GA A & B, CAT 1A, 1B, 2A, 2B"
            draggable={false}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            className="m-auto max-w-none shrink-0 transition-[width,height] duration-200 motion-reduce:transition-none"
            style={{ width: MAP_WIDTH * fit * zoom, height: MAP_HEIGHT * fit * zoom }}
          />
        </div>
        <p className="border-t border-roots-sand/20 px-4 py-2 text-center text-[11px] text-roots-sand/70">
          Kéo để di chuyển · Chụm hai ngón hoặc dùng nút +/− để phóng to · Nhấp đúp để phóng nhanh
        </p>
      </DialogContent>
    </Dialog>
  )
}

function ZoomButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-9 items-center justify-center rounded-full border border-roots-sand/40 text-roots-cream transition-colors hover:bg-roots-cream/10 disabled:opacity-40"
    >
      {children}
    </button>
  )
}
