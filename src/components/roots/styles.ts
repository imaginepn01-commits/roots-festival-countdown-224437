// Kiểu nút dùng chung, lấy theo nút trong bản thiết kế gốc.
export const btnDark =
  'inline-flex items-center justify-center gap-2 border-2 border-roots-deep bg-roots-brown px-6 py-3 text-sm tracking-wide text-roots-cream uppercase transition-colors hover:bg-roots-deep focus-visible:ring-2 focus-visible:ring-roots-orange focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none'

export const btnLight =
  'inline-flex items-center justify-center gap-2 border-2 border-roots-brown bg-[#fdf8ea] px-6 py-3 text-sm tracking-wide text-roots-brown uppercase transition-colors hover:bg-roots-sand/60 focus-visible:ring-2 focus-visible:ring-roots-orange focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none'

/** Nút “Chi tiết hoạt động” dạng viên thuốc kem như trên thiết kế. */
export const btnPill =
  'inline-flex items-center justify-center rounded-md bg-gradient-to-b from-[#fbf3e6] to-[#ead9c2] px-5 py-2 text-roots-maroon shadow-md transition-transform hover:-translate-y-0.5 motion-reduce:transition-none'

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
