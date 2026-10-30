# ROOTS Festival 2027 – Landing page

Landing page chính thức của **ROOTS Festival** – lễ hội văn hóa, nghệ thuật, âm nhạc diễn ra ngày 19–20.06.2027 tại Quảng trường 16 tháng 4, TP. Phan Rang - Tháp Chàm, Ninh Thuận.

Trang được dựng theo đúng bản thiết kế gốc (hình ảnh, bố cục, màu sắc, typography được cắt trực tiếp từ file thiết kế) và bổ sung các tính năng tương tác:

- Đồng hồ đếm ngược Ngày – Giờ – Phút – Giây tới ngày khai mạc, cập nhật theo thời gian thực
- Nút **KHÁM PHÁ ROOTS** cuộn mượt xuống phần Line-up, không tải lại trang
- Line-up: bấm vào ảnh nghệ sĩ để mở giới thiệu ngắn
- Hoạt động: slider ngang (mũi tên, vuốt trên mobile, chấm phân trang), card hover trên desktop và modal chi tiết (ảnh lớn, mô tả, thời gian, địa điểm, thời lượng, CTA “Xem lịch hoạt động”)
- Timeline hai ngày festival
- Merchandise: bấm vào sản phẩm để điền thông tin, xem hướng dẫn chuyển khoản và gửi đơn (lưu bằng Netlify Forms)
- FAQ dạng accordion
- Đặt vé: bảng hạng vé, nút dẫn sang Ticketbox, và modal **XEM MAP KHU VỰC** có phóng to / kéo / chụm để zoom

## Công nghệ

- TanStack Start (React 19, Vite) triển khai trên Netlify
- Tailwind CSS 4, Radix UI (dialog, accordion, sheet)
- Netlify Forms cho đơn hàng merchandise
- Netlify Image CDN để phục vụ ảnh đúng kích thước, định dạng WebP

## Chạy local

```bash
pnpm install
netlify dev   # hoặc: pnpm dev
```

`netlify dev` giả lập Image CDN và Forms; với `pnpm dev`, ảnh qua `/.netlify/images` sẽ không hiển thị.

## Chỉnh sửa nội dung

Toàn bộ nội dung (nghệ sĩ, hoạt động, lịch trình, merch, FAQ, giá vé, thông tin chuyển khoản) nằm trong `src/data/festival.ts`. Các giá trị “Đang cập nhật” là thông tin chưa công bố chính thức và cần được thay thế:

- Số tài khoản / ngân hàng / chủ tài khoản nhận chuyển khoản merch (`BANK_TRANSFER`)
- Khu vực cụ thể và thời lượng từng hoạt động
- Ảnh chính thức của Hoàng Dũng (đặt vào `public/img/` và thêm `image` cho nghệ sĩ)
- Đường dẫn sự kiện cụ thể trên Ticketbox (`EVENT.ticketUrl`)
- Sơ đồ khu vực độ phân giải cao hơn (`public/img/festival-map.png`) để zoom sắc nét hơn

Đơn merch gửi về mục **Forms → merch-order** trong Netlify dashboard.
