import { TIMELINE } from '@/data/festival'

export function Timeline() {
  return (
    <section id="lich-trinh" aria-labelledby="lich-trinh-title" className="paper-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-roots-orange uppercase">Lịch trình</p>
          <h2
            id="lich-trinh-title"
            className="heading-gradient mt-3 font-display text-3xl font-semibold uppercase md:text-5xl"
          >
            Hành trình khám phá
          </h2>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
          {TIMELINE.map((day) => (
            <div key={day.date}>
              <div className="flex items-baseline gap-3 border-b-2 border-roots-maroon/70 pb-3">
                <span className="font-display text-3xl text-roots-red md:text-4xl">{day.date}</span>
                <span className="text-sm tracking-wide text-roots-brown/75 uppercase">{day.label}</span>
              </div>
              <ol className="relative mt-6 ml-2 border-l-2 border-dashed border-roots-sand">
                {day.items.map((item) => (
                  <li key={item.time + item.title} className="relative pb-6 pl-7 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute top-1.5 -left-[7px] size-3 rotate-45 border-2 border-roots-cream bg-roots-orange shadow"
                    />
                    <p className="text-sm font-bold tracking-wide text-roots-orange tabular-nums">{item.time}</p>
                    <p className="mt-1 text-[15px] leading-snug text-roots-brown">{item.title}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
