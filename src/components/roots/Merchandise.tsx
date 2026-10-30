import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Minus, Plus } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BANK_TRANSFER, MERCH, formatVnd, img, type MerchItem } from '@/data/festival'
import { btnDark, btnLight } from './styles'

export function Merchandise() {
  const [active, setActive] = useState<MerchItem | null>(null)

  return (
    <section id="merchandise" aria-labelledby="merch-title" className="bg-[#f6f0e5]">
      <h2 id="merch-title" className="sr-only">
        ROOTS Merchandise
      </h2>

      {/* Desktop / tablet: giữ nguyên bố cục thiết kế, mỗi sản phẩm là một vùng bấm */}
      <div className="relative mx-auto hidden max-w-[1366px] md:block">
        <img
          src={img('/img/merch-bg.jpg', 1600)}
          alt=""
          width={1366}
          height={824}
          loading="lazy"
          className="h-auto w-full"
        />
        <p className="absolute top-[22.5%] left-1/2 w-[22%] -translate-x-1/2 text-center text-[13px] leading-snug text-roots-maroon lg:text-sm">
          Bộ merchandise độc quyền, mang đậm bản sắc văn hoá Chăm
        </p>
        {MERCH.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            aria-label={`Đặt mua ${item.name} – ${formatVnd(item.price, 'VND')}`}
            className="group absolute rounded-xl transition-colors hover:bg-roots-orange/5 focus-visible:ring-2 focus-visible:ring-roots-orange focus-visible:outline-none"
            style={{
              left: `${item.area.left}%`,
              top: `${item.area.top}%`,
              width: `${item.area.width}%`,
              height: `${item.area.height}%`,
            }}
          >
            <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 translate-y-1 rounded-full bg-roots-brown px-3 py-1 text-[11px] tracking-widest whitespace-nowrap text-roots-cream uppercase opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              Đặt mua
            </span>
          </button>
        ))}
      </div>

      {/* Mobile: cùng hình ảnh sản phẩm, xếp dạng lưới dễ chạm */}
      <div className="px-4 py-14 md:hidden">
        <p className="heading-sunset text-center font-display text-4xl font-semibold uppercase">Merchandise</p>
        <p className="mt-2 text-center text-sm text-roots-maroon">
          Bộ merchandise độc quyền, mang đậm bản sắc văn hoá Chăm
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3">
          {MERCH.map((item) => (
            <li key={item.id} className={item.id === 'tui-tote' ? 'col-span-2' : undefined}>
              <button
                type="button"
                onClick={() => setActive(item)}
                aria-label={`Đặt mua ${item.name} – ${formatVnd(item.price, 'VND')}`}
                className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-roots-sand/60 bg-[#f6f0e5]"
              >
                <img src={img(item.image, 480)} alt="" loading="lazy" className="max-h-64 w-auto object-contain" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <OrderDialog item={active} onClose={() => setActive(null)} />
    </section>
  )
}

type Step = 'details' | 'payment' | 'success'
type Status = 'idle' | 'pending' | 'error'

type Customer = {
  full_name: string
  phone: string
  email: string
  delivery: 'pickup' | 'ship'
  address: string
  note: string
}

const EMPTY: Customer = { full_name: '', phone: '', email: '', delivery: 'pickup', address: '', note: '' }

function newOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return 'RTS' + Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

function OrderDialog({ item, onClose }: { item: MerchItem | null; onClose: () => void }) {
  const [step, setStep] = useState<Step>('details')
  const [status, setStatus] = useState<Status>('idle')
  const [quantity, setQuantity] = useState(1)
  const [customer, setCustomer] = useState<Customer>(EMPTY)
  const [orderCode, setOrderCode] = useState('')

  function reset() {
    setStep('details')
    setStatus('idle')
    setQuantity(1)
    setCustomer(EMPTY)
    setOrderCode('')
  }

  function close() {
    if (status === 'pending') return
    onClose()
    // Đợi hiệu ứng đóng xong mới xoá dữ liệu
    window.setTimeout(reset, 200)
  }

  const total = item ? item.price * quantity : 0
  const transferNote = `${orderCode} ${customer.phone}`.trim()

  function update<K extends keyof Customer>(key: K, value: Customer[K]) {
    setCustomer((c) => ({ ...c, [key]: value }))
  }

  function toPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!orderCode) setOrderCode(newOrderCode())
    setStep('payment')
  }

  async function submitOrder() {
    if (!item || status === 'pending') return
    const body = new URLSearchParams({
      'form-name': 'merch-order',
      'bot-field': '',
      order_code: orderCode,
      product: item.name,
      quantity: String(quantity),
      unit_price: String(item.price),
      total: String(total),
      full_name: customer.full_name,
      phone: customer.phone,
      email: customer.email,
      delivery: customer.delivery === 'pickup' ? 'Nhận tại festival' : 'Giao tận nơi',
      address: customer.address,
      note: customer.note,
      transfer_note: transferNote,
    })
    setStatus('pending')
    try {
      const response = await fetch('/merch-order.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling unavailable')
      setStatus('idle')
      setStep('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Dialog open={item !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-h-[94dvh] gap-0 overflow-y-auto border-roots-sand bg-roots-cream p-0 sm:max-w-3xl">
        {item && (
          <div className="grid md:grid-cols-[260px_1fr]">
            <div className="flex flex-col items-center justify-center gap-3 bg-[#f6f0e5] p-6 md:border-r md:border-roots-sand">
              <img src={img(item.image, 520)} alt={item.name} className="max-h-56 w-auto object-contain md:max-h-80" />
            </div>

            <div className="p-6 md:p-8">
              <p className="text-xs tracking-[0.2em] text-roots-orange uppercase">ROOTS Merchandise</p>
              <DialogTitle className="mt-1 font-display text-2xl font-semibold text-roots-brown uppercase md:text-3xl">
                {item.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-lg text-roots-red">
                {formatVnd(item.price, 'VND')}
              </DialogDescription>

              <Steps step={step} />

              {step === 'details' && (
                <form onSubmit={toPayment} className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-roots-brown">Số lượng</span>
                    <div className="flex items-center border border-input">
                      <button
                        type="button"
                        aria-label="Giảm số lượng"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex size-9 items-center justify-center text-roots-brown hover:bg-roots-sand/40"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-10 text-center tabular-nums" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Tăng số lượng"
                        onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                        className="flex size-9 items-center justify-center text-roots-brown hover:bg-roots-sand/40"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>

                  <Field id="full_name" label="Họ và tên">
                    <Input id="full_name" required maxLength={100} autoComplete="name" value={customer.full_name} onChange={(e) => update('full_name', e.target.value)} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="phone" label="Số điện thoại">
                      <Input id="phone" type="tel" required inputMode="tel" pattern="[0-9 +().-]{9,15}" autoComplete="tel" value={customer.phone} onChange={(e) => update('phone', e.target.value)} />
                    </Field>
                    <Field id="email" label="Email">
                      <Input id="email" type="email" required maxLength={254} autoComplete="email" value={customer.email} onChange={(e) => update('email', e.target.value)} />
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold text-roots-brown">Hình thức nhận hàng</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {(
                        [
                          ['pickup', 'Nhận tại festival'],
                          ['ship', 'Giao tận nơi'],
                        ] as const
                      ).map(([value, label]) => (
                        <label
                          key={value}
                          className="flex cursor-pointer items-center gap-2 border border-input px-3 py-2.5 text-sm has-[:checked]:border-roots-orange has-[:checked]:bg-roots-orange/10"
                        >
                          <input
                            type="radio"
                            name="delivery"
                            value={value}
                            checked={customer.delivery === value}
                            onChange={() => update('delivery', value)}
                            className="accent-roots-orange"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {customer.delivery === 'ship' && (
                    <Field id="address" label="Địa chỉ nhận hàng">
                      <Textarea id="address" required maxLength={300} rows={2} autoComplete="street-address" value={customer.address} onChange={(e) => update('address', e.target.value)} />
                    </Field>
                  )}
                  <Field id="note" label="Ghi chú (không bắt buộc)">
                    <Textarea id="note" maxLength={500} rows={2} value={customer.note} onChange={(e) => update('note', e.target.value)} />
                  </Field>

                  <div className="flex items-center justify-between border-t border-roots-sand pt-4">
                    <span className="text-sm text-roots-brown/80">Tạm tính</span>
                    <span className="font-display text-xl text-roots-red">{formatVnd(total, 'VND')}</span>
                  </div>
                  {customer.delivery === 'ship' && (
                    <p className="text-xs text-roots-brown/70">Phí giao hàng (nếu có) sẽ được BTC xác nhận khi liên hệ.</p>
                  )}
                  <button type="submit" className={`${btnDark} w-full`}>
                    Tiếp tục thanh toán
                  </button>
                </form>
              )}

              {step === 'payment' && (
                <div className="mt-5 space-y-4">
                  <p className="text-sm text-roots-brown/85">
                    Vui lòng chuyển khoản theo thông tin dưới đây, sau đó bấm <strong>“Tôi đã chuyển khoản”</strong> để
                    gửi đơn hàng.
                  </p>
                  <dl className="divide-y divide-roots-sand border border-roots-sand bg-[#fdf8ea] text-sm">
                    <Row label="Ngân hàng" value={BANK_TRANSFER.bank} />
                    <Row label="Chủ tài khoản" value={BANK_TRANSFER.accountName} />
                    <Row label="Số tài khoản" value={BANK_TRANSFER.accountNumber} copy />
                    <Row label="Số tiền" value={formatVnd(total, 'VND')} strong />
                    <Row label="Nội dung CK" value={transferNote} copy strong />
                  </dl>
                  <p className="text-xs text-roots-brown/70">
                    Đơn hàng: {quantity} × {item.name} · {customer.full_name} ·{' '}
                    {customer.delivery === 'pickup' ? 'Nhận tại festival' : 'Giao tận nơi'}
                  </p>
                  {status === 'error' && (
                    <p role="alert" className="border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                      Chưa gửi được đơn hàng. Thông tin của bạn vẫn được giữ nguyên, vui lòng thử lại sau ít phút.
                    </p>
                  )}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" disabled={status === 'pending'} onClick={() => setStep('details')} className={`${btnLight} sm:flex-1`}>
                      Quay lại
                    </button>
                    <button type="button" disabled={status === 'pending'} onClick={submitOrder} className={`${btnDark} disabled:opacity-60 sm:flex-[2]`}>
                      {status === 'pending' ? 'Đang gửi…' : 'Tôi đã chuyển khoản'}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div role="status" className="mt-6 text-center">
                  <CheckCircle2 className="mx-auto size-12 text-roots-orange" />
                  <p className="mt-3 font-display text-xl text-roots-brown">Cảm ơn bạn đã đặt hàng!</p>
                  <p className="mt-2 text-sm text-roots-brown/80">
                    Mã đơn <strong>{orderCode}</strong> đã được ghi nhận. BTC sẽ đối soát chuyển khoản và liên hệ qua số{' '}
                    {customer.phone} để xác nhận.
                  </p>
                  <button type="button" onClick={close} className={`${btnDark} mt-6`}>
                    Đóng
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Steps({ step }: { step: Step }) {
  const steps: [Step, string][] = [
    ['details', 'Thông tin'],
    ['payment', 'Chuyển khoản'],
    ['success', 'Hoàn tất'],
  ]
  const current = steps.findIndex(([s]) => s === step)
  return (
    <ol className="mt-5 flex items-center gap-2 text-xs tracking-wide uppercase">
      {steps.map(([key, label], i) => (
        <li key={key} className="flex items-center gap-2">
          <span
            className={
              i <= current
                ? 'flex size-6 items-center justify-center rounded-full bg-roots-brown text-roots-cream'
                : 'flex size-6 items-center justify-center rounded-full border border-roots-sand text-roots-brown/50'
            }
          >
            {i + 1}
          </span>
          <span className={i <= current ? 'text-roots-brown' : 'text-roots-brown/50'}>{label}</span>
          {i < steps.length - 1 && <span aria-hidden className="h-px w-4 bg-roots-sand sm:w-8" />}
        </li>
      ))}
    </ol>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-roots-brown">
        {label}
      </Label>
      {children}
    </div>
  )
}

function Row({ label, value, copy, strong }: { label: string; value: string; copy?: boolean; strong?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5">
      <dt className="text-roots-brown/70">{label}</dt>
      <dd className="flex items-center gap-2 text-right">
        <span className={strong ? 'font-bold text-roots-brown' : 'text-roots-brown'}>{value}</span>
        {copy && (
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(value).then(() => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1500)
              })
            }}
            className="text-xs text-roots-orange underline-offset-2 hover:underline"
          >
            {copied ? 'Đã chép' : 'Sao chép'}
          </button>
        )}
      </dd>
    </div>
  )
}
