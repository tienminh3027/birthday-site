# 🎂 Cinematic Birthday Website

Website chúc mừng sinh nhật 3D/cinematic, chạy 100% frontend (HTML + CSS + JS, Three.js + GSAP qua CDN — không cần cài đặt gì).

## Cách chạy

1. Mở thư mục này bằng **Live Server** (VS Code extension) hoặc bất kỳ static server nào, ví dụ:
   ```
   npx serve .
   ```
2. Mở trình duyệt tại địa chỉ được cung cấp.

> Không mở trực tiếp `index.html` bằng file:// nếu có thể, vì một số trình duyệt chặn autoplay/âm thanh và load ảnh cục bộ khi không có server — Live Server là cách tốt nhất.

## Chỉnh nội dung — chỉ cần sửa 1 chỗ

Mở `script.js`, sửa object `birthdayConfig` ở đầu file:

```js
const birthdayConfig = {
  name: "TÊN NGƯỜI NHẬN",       // tên hiển thị lớn
  nickname: "Biệt danh",         // dùng ở dòng "Made with ❤️ for..."
  message: `...`,                // lời nhắn typewriter
  giftMessage: "...",            // lời nhắn trong hộp quà bất ngờ
  music: "assets/music.mp3",
  photos: [
    { src: "assets/photo1.jpg", date: "SPRING, 2021", caption: "..." },
    // thêm/bớt bao nhiêu ảnh tùy thích, gallery tự động render
  ],
};
```

## Thay ảnh & nhạc

Đặt các file vào thư mục `assets/`:

- `assets/music.mp3` — nhạc nền (tự tắt nếu trình duyệt chặn autoplay; sẽ phát khi người dùng bấm "Bắt đầu hành trình" hoặc bấm icon nhạc).
- `assets/photo1.jpg` … `photo6.jpg` — ảnh kỷ niệm. Nếu ảnh chưa có, card sẽ tự hiện placeholder "PHOTO_0x" thay vì lỗi vỡ ảnh, nên bạn có thể xem trước bố cục ngay cả khi chưa có ảnh thật.

## Cấu trúc file

```
index.html   → cấu trúc toàn bộ trang, các section
style.css    → toàn bộ giao diện, glassmorphism, responsive
script.js    → birthdayConfig + toàn bộ logic/animation (3D, particle, cake, fireworks, gift box, cursor, nhạc)
assets/      → nơi để music.mp3 và photo1..N.jpg
```

## Hành trình trải nghiệm

1. **Loading screen** → intro cinematic (HEY... → reveal tên → nút bắt đầu)
2. **A Special Day** — lời chúc reveal theo scroll
3. **Our Memories** — gallery 3D, hover tilt / vuốt trên mobile
4. **A Little Message For You** — typewriter
5. **3D Cake** — click từng ngọn nến để thổi tắt → **Fireworks**
6. **One Last Surprise** — hộp quà 3D, click để mở
7. **Final screen** — nút "Xem lại hành trình" quay về đầu

## Ghi chú hiệu năng

- Số lượng particle tự giảm trên màn hình < 720px (mobile).
- Tất cả animation dừng khi tab bị ẩn (tránh ngốn CPU/pin).
- Custom cursor tự tắt trên thiết bị cảm ứng.
