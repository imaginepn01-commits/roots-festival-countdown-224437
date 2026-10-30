// Nội dung của landing page ROOTS Festival.
// Mọi dữ liệu hiển thị nằm tại đây để dễ chỉnh sửa. Các giá trị
// `PLACEHOLDER` là thông tin chưa được công bố chính thức — thay thế khi có.

export const PLACEHOLDER = 'Đang cập nhật'

/** Đường dẫn ảnh qua Netlify Image CDN (tự resize + webp, chất lượng cao để giữ nét chữ trong ảnh). */
export function img(path: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(path)}&w=${width}&fm=webp&q=90`
}

export const EVENT = {
  name: 'ROOTS Festival',
  // Giờ đón tiếp đầu tiên trong lịch trình (UTC+7)
  startsAt: '2027-06-19T08:00:00+07:00',
  endsAt: '2027-06-20T23:00:00+07:00',
  dateLabel: '19–20.06.2027',
  venue: 'Quảng trường 16 tháng 4, TP. Phan Rang - Tháp Chàm, Ninh Thuận',
  ticketUrl: 'https://ticketbox.vn',
}

export type Artist = {
  id: string
  name: string
  image?: string
  genre: string
  bio: string
}

export const ARTISTS: Artist[] = [
  {
    id: 'hieuthuhai',
    name: 'HIEUTHUHAI',
    image: '/img/artist-hieuthuhai.jpg',
    genre: 'Hip-hop / Pop',
    bio: 'Rapper, ca sĩ thuộc thế hệ Gen Z với phong cách điềm tĩnh, ca từ tinh tế và giai điệu bắt tai. HIEUTHUHAI là một trong những gương mặt dẫn đầu làn sóng hip-hop – pop đương đại của Việt Nam.',
  },
  {
    id: 'bui-cong-nam',
    name: 'Bùi Công Nam',
    image: '/img/artist-bui-cong-nam.jpg',
    genre: 'Pop / Singer-songwriter',
    bio: 'Ca sĩ – nhạc sĩ đa tài, được yêu mến bởi chất giọng ấm, khả năng sáng tác giàu cảm xúc và năng lượng sân khấu gần gũi, hài hước.',
  },
  {
    id: 'grey-d',
    name: 'GREY D',
    image: '/img/artist-grey-d.jpg',
    genre: 'R&B / Pop',
    bio: 'Giọng ca trẻ mang màu sắc R&B mềm mại, lãng mạn. GREY D chinh phục khán giả bằng những bản tình ca nhẹ nhàng cùng hình ảnh trình diễn hiện đại.',
  },
  {
    id: 'phung-khanh-linh',
    name: 'Phùng Khánh Linh',
    image: '/img/artist-phung-khanh-linh.jpg',
    genre: 'Indie Pop',
    bio: 'Nữ ca sĩ – nhạc sĩ với chất nhạc indie pop trong trẻo, mộc mạc, kể những câu chuyện đời thường bằng ca từ dịu dàng và nhiều suy tư.',
  },
  {
    id: 'phuong-my-chi',
    name: 'Phương Mỹ Chi',
    image: '/img/artist-phuong-my-chi.jpg',
    genre: 'Dân gian đương đại',
    bio: 'Giọng ca gắn liền với chất liệu dân gian Việt Nam, không ngừng làm mới âm nhạc truyền thống bằng ngôn ngữ trẻ trung, đương đại — một tinh thần rất “ROOTS”.',
  },
  {
    id: 'vuong-binh',
    name: 'VƯƠNG BÌNH',
    image: '/img/artist-vuong-binh.jpg',
    genre: 'Pop Ballad',
    bio: 'Gương mặt nam ca sĩ trẻ với chất giọng giàu cảm xúc và phong cách trình diễn chỉn chu, mang đến những bản pop ballad sâu lắng.',
  },
  {
    id: 'jaysonlei',
    name: 'Jaysonlei',
    image: '/img/artist-jaysonlei.jpg',
    genre: 'Pop / R&B',
    bio: 'Nghệ sĩ trẻ mang hơi thở pop – R&B hiện đại, đại diện cho năng lượng mới mẻ và sức sáng tạo của thế hệ hôm nay.',
  },
  {
    id: '52hz',
    name: '52Hz',
    image: '/img/artist-52hz.jpg',
    genre: 'Indie / Pop',
    bio: 'Nữ nghệ sĩ Gen Z với màu âm nhạc riêng biệt, cá tính và giàu cảm xúc — một tần số khác biệt trong bức tranh âm nhạc trẻ.',
  },
]

export type Activity = {
  id: string
  group: 'culture' | 'food' | 'concert'
  title: string
  image: string
  summary: string
  description: string
  experiences: string[]
  time: string
  location: string
  duration?: string
  /** Vị trí nút “Chi tiết hoạt động” in sẵn trên ảnh thiết kế (theo %). */
  hotspot?: { left: number; top: number; width: number; height: number }
}

const VENUE_ZONE = (zone: string) =>
  `${zone}, Quảng trường 16/4 (vị trí cụ thể: ${PLACEHOLDER.toLowerCase()})`

export const ACTIVITIES: Activity[] = [
  {
    id: 'am-nhac-mua-nghi-le-cham',
    group: 'culture',
    title: 'Âm nhạc, múa và nghi lễ Chăm',
    image: '/img/act-cham.jpg',
    summary:
      'Khám phá những giai điệu, điệu múa và nét văn hóa gắn với Rija Harei – Lễ múa ban ngày.',
    description:
      'Khám phá những giai điệu, điệu múa và nét văn hóa gắn với Rija Harei – Lễ múa ban ngày, mở ra một lát cắt đặc sắc về đời sống tinh thần của cộng đồng Chăm.',
    experiences: [
      'Thưởng thức các tiết mục âm nhạc với trống Ginăng, kèn Saranai',
      'Xem trình diễn múa đội nước, múa quạt truyền thống',
      'Tìm hiểu ý nghĩa của Rija Harei trong đời sống cộng đồng Chăm',
    ],
    time: '19/06/2027 · 09:00 – 17:00',
    location: VENUE_ZONE('Khu trải nghiệm văn hóa'),
    duration: PLACEHOLDER,
    hotspot: { left: 73.9, top: 9, width: 20.4, height: 5.9 },
  },
  {
    id: 'workshop-gom-bau-truc',
    group: 'culture',
    title: 'Workshop gốm Bàu Trúc',
    image: '/img/act-gom.jpg',
    summary:
      'Tự tay chạm đất, tạo hình và tìm hiểu kỹ thuật làm gốm thủ công truyền qua nhiều thế hệ.',
    description:
      'Khám phá một trong những làng nghề gốm truyền thống lâu đời của người Chăm. Người tham gia được quan sát nghệ nhân thực hiện các công đoạn làm gốm và trực tiếp trải nghiệm tạo hình sản phẩm bằng tay.',
    experiences: [
      'Quan sát nghệ nhân Bàu Trúc nặn gốm không dùng bàn xoay',
      'Tự tay tạo hình một sản phẩm gốm nhỏ',
      'Tìm hiểu quy trình nung lộ thiên đặc trưng của gốm Chăm',
    ],
    time: '19/06/2027 · 09:00 – 17:00',
    location: VENUE_ZONE('Khu workshop'),
    duration: PLACEHOLDER,
    hotspot: { left: 73.6, top: 87.1, width: 20.4, height: 5.7 },
  },
  {
    id: 'workshop-det-tho-cam',
    group: 'culture',
    title: 'Workshop dệt thổ cẩm',
    image: '/img/act-det.jpg',
    summary: 'Khám phá màu sắc, hoa văn và kỹ thuật dệt gắn với đời sống văn hóa Chăm.',
    description:
      'Khám phá màu sắc, hoa văn và kỹ thuật dệt gắn với đời sống văn hóa Chăm. Mỗi tấm thổ cẩm là một câu chuyện được dệt nên từ đôi tay kiên nhẫn của người phụ nữ Chăm.',
    experiences: [
      'Tìm hiểu ý nghĩa các hoa văn thổ cẩm truyền thống',
      'Quan sát nghệ nhân thao tác trên khung dệt',
      'Thử dệt một dải hoa văn nhỏ',
    ],
    time: '19/06/2027 · 09:00 – 17:00',
    location: VENUE_ZONE('Khu workshop'),
    duration: PLACEHOLDER,
    hotspot: { left: 6.5, top: 64.8, width: 20.4, height: 5.7 },
  },
  {
    id: 'trang-phuc-photobooth',
    group: 'culture',
    title: 'Trải nghiệm trang phục Chăm & Photobooth',
    image: '/img/act-photobooth.jpg',
    summary:
      'Khoác lên mình trang phục mang dấu ấn bản địa và lưu lại khoảnh khắc riêng tại ROOTS.',
    description:
      'Khoác lên mình những bộ trang phục mang dấu ấn bản địa và lưu lại khoảnh khắc riêng tại photobooth với frame độc quyền festival.',
    experiences: [
      'Thử trang phục truyền thống của người Chăm',
      'Chụp ảnh tại photobooth với frame độc quyền ROOTS',
      'Nhận ngay 4 ảnh lưu niệm in tại chỗ',
    ],
    time: '19–20/06/2027 · ' + PLACEHOLDER,
    location: VENUE_ZONE('Khu Photobooth'),
    duration: PLACEHOLDER,
  },
  {
    id: 'ginraong-laya',
    group: 'food',
    title: 'Ginraong Laya – bánh củ gừng',
    image: '/img/food-ginraong.jpg',
    summary: 'Món bánh truyền thống của người Chăm.',
    description:
      'Thưởng thức Ginraong Laya – bánh củ gừng, món bánh truyền thống mang hương vị đặc trưng của ẩm thực Chăm Ninh Thuận.',
    experiences: ['Thưởng thức bánh truyền thống', 'Nghe kể câu chuyện phía sau món bánh'],
    time: '19–20/06/2027 · ' + PLACEHOLDER,
    location: VENUE_ZONE('Khu ẩm thực'),
  },
  {
    id: 'goi-tom-rau',
    group: 'food',
    title: 'Gỏi tôm rau',
    image: '/img/food-goi-tom.jpg',
    summary: 'Hương vị dân dã của vùng đất nắng gió.',
    description:
      'Gỏi tôm rau – món ăn dân dã đậm vị địa phương, kết hợp rau rừng, tôm và đậu phộng rang.',
    experiences: ['Thưởng thức đặc sản địa phương', 'Khám phá nguyên liệu bản địa'],
    time: '19–20/06/2027 · ' + PLACEHOLDER,
    location: VENUE_ZONE('Khu ẩm thực'),
  },
  {
    id: 'ca-ri-de-cham',
    group: 'food',
    title: 'Cà ri dê Chăm',
    image: '/img/food-ca-ri-de.jpg',
    summary: 'Đặc sản trứ danh của Ninh Thuận.',
    description:
      'Cà ri dê Chăm – món ăn đậm đà gia vị, thường được dùng cùng bánh mì, là đặc sản không thể bỏ lỡ khi đến Ninh Thuận.',
    experiences: ['Thưởng thức món đặc sản Ninh Thuận', 'Nghỉ chân cùng bạn bè tại khu Food & Fun'],
    time: '19–20/06/2027 · ' + PLACEHOLDER,
    location: VENUE_ZONE('Khu ẩm thực'),
  },
  {
    id: 'booth-nha-tai-tro',
    group: 'food',
    title: 'Booth nhà tài trợ',
    image: '/img/sponsors.jpg',
    summary: 'Gian hàng trải nghiệm, activation từ đối tác của festival.',
    description:
      'Khám phá các gian hàng trải nghiệm, activation và những hoạt động đặc biệt từ đối tác của festival.',
    experiences: ['Tham gia mini game và activation', 'Nhận quà tặng từ nhà tài trợ'],
    time: '19–20/06/2027 · ' + PLACEHOLDER,
    location: VENUE_ZONE('Khu Booth nhà tài trợ'),
  },
  {
    id: 'am-thanh-ban-dia',
    group: 'concert',
    title: 'Âm thanh bản địa',
    image: '/img/act-cham.jpg',
    summary: 'Chất liệu âm nhạc mang hơi thở văn hóa Chăm.',
    description:
      'Những chất liệu âm nhạc mang hơi thở văn hóa Chăm trở thành một phần của không gian trình diễn.',
    experiences: ['Nghe nhạc cụ truyền thống Chăm trên sân khấu lớn', 'Cảm nhận âm thanh bản địa hòa cùng âm nhạc điện tử'],
    time: '20/06/2027 · 18:00 – 23:00',
    location: VENUE_ZONE('Sân khấu chính'),
  },
  {
    id: 'dan-nghe-si',
    group: 'concert',
    title: 'Dàn nghệ sĩ đa sắc màu',
    image: '/img/artists-collage.jpg',
    summary:
      'HIEUTHUHAI, Bùi Công Nam, GREY D, Phùng Khánh Linh, Phương Mỹ Chi, VƯƠNG BÌNH, Jaysonlei, 52Hz',
    description:
      'HIEUTHUHAI, Bùi Công Nam, GREY D, Phùng Khánh Linh, Phương Mỹ Chi, VƯƠNG BÌNH, Jaysonlei, 52Hz cùng tạo nên một hành trình cảm xúc trên sân khấu chính.',
    experiences: ['Những bản hit được yêu thích', 'Màn trình diễn được dàn dựng riêng cho ROOTS'],
    time: '20/06/2027 · 18:00 – 23:00',
    location: VENUE_ZONE('Sân khấu chính'),
  },
  {
    id: 'special-collaborations',
    group: 'concert',
    title: 'Special Collaborations',
    image: '/img/concert-stage.jpg',
    summary: 'Những màn kết hợp được xây dựng riêng cho ROOTS.',
    description:
      'Những màn kết hợp được xây dựng riêng cho ROOTS, nơi âm nhạc hiện đại gặp những chất liệu của vùng đất.',
    experiences: ['Các màn collab chỉ có tại ROOTS', 'Nghệ sĩ đương đại cùng nghệ nhân Chăm'],
    time: '20/06/2027 · 18:00 – 23:00',
    location: VENUE_ZONE('Sân khấu chính'),
  },
]

export const TIMELINE = [
  {
    date: '19/06/2027',
    label: 'Ngày 1 · Chạm vào văn hóa',
    items: [
      { time: '08:00 – 09:00', title: 'Đón tiếp đại biểu, khách mời' },
      { time: '09:00 – 11:00', title: 'Lễ khai mạc ROOTS FESTIVAL & chương trình nghệ thuật văn hóa Chăm' },
      { time: '09:00 – 17:00', title: 'Hoạt động trải nghiệm văn hóa, tham quan và workshop' },
      { time: '14:00 – 22:00', title: 'Soundcheck & Rehearsal' },
    ],
  },
  {
    date: '20/06/2027',
    label: 'Ngày 2 · ROOTS Music Concert',
    items: [
      { time: '14:00', title: 'Mở cổng Check-in & khu hoạt động trải nghiệm' },
      { time: '15:00', title: 'Mở cổng Check-in Sky Lounge' },
      { time: '16:00', title: 'Mở khu vực sân khấu' },
      { time: '18:00', title: 'Bắt đầu chương trình biểu diễn chính' },
      { time: '20:00', title: 'Đóng cổng Check-in' },
      { time: '23:00', title: 'Kết thúc chương trình' },
    ],
  },
]

export type MerchItem = {
  id: string
  name: string
  price: number
  image: string
  /** Vị trí sản phẩm trên ảnh merchandise gốc (theo %). */
  area: { left: number; top: number; width: number; height: number }
}

export const MERCH: MerchItem[] = [
  { id: 'tui-tote', name: 'Túi tote', price: 259000, image: '/img/merch-tote.jpg', area: { left: 61.1, top: 23.3, width: 27.5, height: 44.9 } },
  { id: 'khan-bandana', name: 'Khăn Bandana', price: 199000, image: '/img/merch-bandana.jpg', area: { left: 12.4, top: 56.1, width: 27.1, height: 40.7 } },
  { id: 'moc-khoa', name: 'Móc khoá', price: 99000, image: '/img/merch-keychain.jpg', area: { left: 16.8, top: 25.5, width: 22.7, height: 30.9 } },
  { id: 'lanyard', name: 'Lanyard', price: 89000, image: '/img/merch-lanyard.jpg', area: { left: 41.9, top: 28.9, width: 11.7, height: 59.5 } },
  { id: 'fridge-magnet', name: 'Fridge magnet', price: 129000, image: '/img/merch-magnet.jpg', area: { left: 55.3, top: 68, width: 20.5, height: 29.1 } },
]

/** Thông tin chuyển khoản — thay bằng tài khoản chính thức của BTC. */
export const BANK_TRANSFER = {
  bank: PLACEHOLDER,
  accountName: PLACEHOLDER,
  accountNumber: PLACEHOLDER,
}

export const FAQS = [
  {
    q: 'Tôi có thể mua vé ở đâu?',
    a: 'Bạn có thể mua vé chính thức của sự kiện thông qua nền tảng Ticketbox. Vui lòng kiểm tra tình trạng vé và lựa chọn hạng vé phù hợp.',
  },
  {
    q: 'Có khu vực gửi xe không?',
    a: 'Có bạn nhé. Sự kiện bố trí 3 khu vực gửi xe tại Quảng trường 16/4 để phục vụ khách tham dự. Bạn có thể theo dõi sơ đồ sự kiện để lựa chọn khu vực gửi xe thuận tiện nhất.',
  },
  {
    q: 'Tôi có cần mua vé riêng cho concert không?',
    a: 'Bạn không cần nha. Vé tham dự ROOTS FESTIVAL đã bao gồm quyền tham gia đêm concert theo hạng vé tương ứng (GA, FANZONE, VIP, SVIP, SKY LOUNGE, CAT). Hạng vé càng cao, vị trí càng gần sân khấu.',
  },
  {
    q: 'Các hoạt động Workshop có tính phí không?',
    a: 'Có bạn nhé. Một số hoạt động Workshop như làm gốm và chụp Photobooth sẽ có tính phí.',
  },
  {
    q: 'Có thể mang đồ ăn thức uống vào không?',
    a: 'Không bạn nhé. Đồ ăn và thức uống ngoài không được phép mang vào khuôn viên. Tại lễ hội có khu vực ẩm thực đa dạng phục vụ suốt sự kiện.',
  },
]

export const TICKETS = [
  { tier: 'SKY LOUNGE', price: 10000000 },
  { tier: 'SVIP', price: 5000000 },
  { tier: 'VIP', price: 4000000 },
  { tier: 'FANZONE', price: 2500000 },
  { tier: 'GA', price: 1500000 },
  { tier: 'CAT', price: 1000000 },
]

export function formatVnd(value: number, suffix = 'VNĐ') {
  return `${value.toLocaleString('vi-VN')} ${suffix}`
}
