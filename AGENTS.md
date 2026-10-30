# AGENTS.md

## Project

Single-page landing site for ROOTS Festival 2027 (Vietnamese). TanStack Start + React 19 + Tailwind 4 on Netlify. All UI copy is Vietnamese.

The page faithfully reproduces a supplied full-page design mockup. Most imagery in `public/img/` was cropped directly from that mockup, so many headings and labels (activity titles, artist names, merch names/prices, "Chi tiết hoạt động" pills) are **baked into the images**. Do not re-render that text in HTML on top of the images; edit or replace the image instead.

## Structure

```
public/img/            Design crops + generated images (hero-bg.jpg is a text-free AI-cleaned hero, concert-stage.jpg is generated)
public/merch-order.html Static Netlify Forms registration for the merch order form (fields must match Merchandise.tsx)
src/data/festival.ts   Single source of content: artists, activities, timeline, merch, FAQ, tickets, bank info, img() CDN helper
src/components/roots/  Page sections: SiteHeader, Hero (countdown), Lineup, Activities (slider, food & fun, concert),
                       ActivityDialog, Timeline, Merchandise (order dialog), Faq, Tickets (map dialog), SiteFooter, styles.ts
src/routes/index.tsx   Composes the sections
src/styles.css         ROOTS palette (--roots-*), fonts (Noto Serif body, Playfair Display headings), paper-bg / heading utilities
```

## Conventions & decisions

- Images are served through Netlify Image CDN via `img(path, width)`; logos and text headings are traced vector SVGs (served directly, crisp at any DPR); the map PNG is served directly.
- Section anchors: `top`, `line-up`, `hoat-dong`, `music-concert`, `lich-trinh`, `merchandise`, `faq`, `dat-ve`. Use `scrollToId()` for smooth scrolling.
- Overlays on mockup images use percentage coordinates (`hotspot` on activities, `area` on merch) measured against the 1366px-wide source crops. Re-measure if an image is replaced.
- Desktop merch uses the original merch artwork with clickable areas; mobile uses individual product crops in a grid.
- Slider uses native horizontal scroll-snap (swipe for free); arrows/dots call `scrollTo`.
- Countdown renders `--` on the server and starts ticking after mount to avoid hydration mismatches.
- Values shown as `PLACEHOLDER` ("Đang cập nhật") are unofficial — never invent official times, locations or bank details.
- Merch orders are submitted to Netlify Forms (`merch-order`) by POSTing to `/merch-order.html`.
