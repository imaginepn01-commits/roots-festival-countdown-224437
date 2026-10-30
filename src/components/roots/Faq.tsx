import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQS } from '@/data/festival'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-[#faf4e4] py-16 md:py-24">
      <div className="mx-auto max-w-[920px] px-4 sm:px-8">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-roots-orange uppercase">FAQ</p>
          <h2 id="faq-title" className="heading-gradient mt-3 font-display text-3xl font-semibold uppercase md:text-5xl">
            Thắc mắc về sự kiện
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 border-y-2 border-roots-maroon/60">
          {FAQS.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-roots-sand">
              <AccordionTrigger className="py-5 text-base font-semibold text-roots-brown hover:no-underline md:text-lg [&>svg]:size-5 [&>svg]:text-roots-orange">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-roots-brown/80">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
