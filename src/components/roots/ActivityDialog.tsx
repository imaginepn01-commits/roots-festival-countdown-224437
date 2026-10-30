import type { ReactNode } from 'react'
import { CalendarDays, Clock, MapPin } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { img, type Activity } from '@/data/festival'
import { btnDark, scrollToId } from './styles'

export function ActivityDialog({
  activity,
  onClose,
}: {
  activity: Activity | null
  onClose: () => void
}) {
  return (
    <Dialog open={activity !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[94dvh] gap-0 overflow-y-auto border-roots-sand bg-roots-cream p-0 sm:max-w-3xl [&>button:last-child]:rounded-full [&>button:last-child]:bg-roots-cream [&>button:last-child]:p-1.5 [&>button:last-child]:opacity-100 [&>button:last-child]:shadow">
        {activity && (
          <>
            <img
              src={img(activity.image, 1200)}
              alt=""
              className="aspect-[16/8] w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <p className="text-xs tracking-[0.2em] text-roots-orange uppercase">
                {activity.group === 'culture'
                  ? 'Chạm vào văn hóa Chăm'
                  : activity.group === 'food'
                    ? 'Vui chơi & Ẩm thực'
                    : 'ROOTS Music Concert'}
              </p>
              <DialogTitle className="mt-2 font-display text-2xl leading-tight font-semibold text-roots-brown uppercase md:text-3xl">
                {activity.title}
              </DialogTitle>
              <DialogDescription className="mt-4 text-[15px] leading-relaxed text-roots-brown/85">
                {activity.description}
              </DialogDescription>

              <h3 className="mt-6 text-sm font-bold tracking-wide text-roots-maroon uppercase">
                Bạn sẽ được trải nghiệm
              </h3>
              <ul className="mt-2 space-y-1.5 text-[15px] text-roots-brown/85">
                {activity.experiences.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-roots-orange" />
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid gap-3 border-t border-roots-sand pt-5 text-sm text-roots-brown sm:grid-cols-3">
                <Meta icon={<CalendarDays className="size-4" />} label="Thời gian" value={activity.time} />
                <Meta icon={<MapPin className="size-4" />} label="Địa điểm" value={activity.location} />
                {activity.duration && (
                  <Meta icon={<Clock className="size-4" />} label="Thời lượng" value={activity.duration} />
                )}
              </dl>

              <button
                type="button"
                className={`${btnDark} mt-7 w-full sm:w-auto`}
                onClick={() => {
                  onClose()
                  window.setTimeout(() => scrollToId('lich-trinh'), 320)
                }}
              >
                Xem lịch hoạt động
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Meta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs tracking-wide text-roots-orange uppercase">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 leading-snug">{value}</dd>
    </div>
  )
}
