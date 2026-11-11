# Website Undangan — Raka & Sinta (infly)

Undangan pernikahan digital satu halaman, dibuat dengan **HTML + CSS + JavaScript vanilla** — tanpa framework, tanpa build step, tanpa backend. Siap di-hosting gratis di **GitHub Pages**.

Tema: **Navy & Gold Elegan** (navy `#1F3864`, gold `#C9A227`, ivory `#FAF6EF`) — sama seperti brand infly di proposal dan flyer.

> **Paket Premium (v2, 11 Nov 2026):** musik asli + autoplay, Tambah ke Kalender (Google + `.ics`), ayat pembuka + Turut Mengundang + doa penutup, animasi scroll AOS, galeri lightbox, dress code, dan kisah cinta. Lihat "Yang berubah di v2" di bawah.

## Isi paket

```
website-undangan-infly/
├── index.html          # Struktur + semua teks undangan
├── wedding.ics         # File kalender (akad + resepsi) untuk diunduh tamu
├── css/
│   └── style.css       # Semua tampilan (Navy & Gold, mobile-first)
├── js/
│   └── script.js       # Nama tamu, countdown, RSVP, salin nomor, musik, AOS, lightbox
├── assets/
│   ├── logo-infly.png      # Logo infly (amplop bersayap, latar putih)
│   ├── foto-pasangan.jpg   # Foto mockup undangan asli (cincin, mawar, ponsel)
│   └── music.mp3           # "Meditation Impromptu 01" — Kevin MacLeod, CC BY 4.0
└── README.md           # File ini
```

**Tidak ada gambar AI** di paket ini. Logo dan foto adalah aset asli dari proposal infly. Galeri memakai 3 crop berbeda (CSS `object-position`) dari satu foto yang sama — bukan gambar lain dari internet.

## Cara hosting di GitHub Pages (gratis)

1. **Buat repository baru** di GitHub (mis. nama repo: `undangan-raka-sinta`). Pilih **Public**.
2. **Upload semua file** dari ZIP ini ke repository (tombol *Add file → Upload files*), pastikan `index.html` ada di **root** repository — bukan di dalam subfolder.
3. Buka **Settings → Pages** (menu kiri).
4. Pada *Build and deployment → Source*, pilih **Deploy from a branch**.
5. Pilih branch **main** dan folder **/(root)**, lalu klik **Save**.
6. Tunggu 1–2 menit. Link undangan muncul di bagian atas halaman Pages, bentuknya:
   `https://username.github.io/undangan-raka-sinta/`
7. Bagikan link itu ke tamu. Untuk nama tamu personal, tambahkan `?to=Nama` di akhir link, contoh:
   `https://username.github.io/undangan-raka-sinta/?to=Budi%20Santoso`

**Catatan:** semua path di situs ini relatif (`assets/...`, `css/...`, `js/...`, `wedding.ics`), jadi situs jalan baik di root domain maupun di subpath GitHub Pages.

## Cara mengganti data demo menjadi data asli

Semua teks ada di `index.html` — edit langsung dengan teks editor apa pun. Yang paling sering diganti:

| Yang diganti | Di mana |
|---|---|
| Nama pengantin (Raka & Sinta) | `index.html` — bagian sampul, hero, dan penutup |
| Nama orang tua | `index.html` — bagian hero (`.hero-parents`) |
| Tanggal & jam acara | `index.html` (tampilan) **dan** `js/script.js` (hitung mundur: ubah `new Date("2026-12-20T01:00:00Z")` — jam di sini UTC, jadi 08.00 WIB = 01.00 UTC) **dan** `wedding.ics` (DTSTART/DTEND) **dan** tautan Google Calendar di `index.html` (parameter `dates=`) |
| Nama gedung / alamat | `index.html` — kartu acara, dan tautan Google Maps (ganti `query=Gedung+Serbaguna+Jakarta`) |
| Nomor WhatsApp RSVP | `js/script.js` — ubah `WA_NUMBER` (format internasional tanpa `+`, mis. `62812xxxxxxx`) |
| Nomor DANA | `index.html` — kartu amplop digital (teks yang tampil **dan** `data-copy`) |
| Nomor rekening bank | `index.html` — kartu Bank BCA. **Wajib ganti:** nomor `1234 5678 90` adalah **NOMOR CONTOH**, bukan nomor asli |
| Foto galeri / foto hero | Ganti file `assets/foto-pasangan.jpg` dengan foto asli (nama file tetap sama, atau ubah `src` di `index.html`) |
| Logo | Ganti file `assets/logo-infly.png` (logo harus berlatar putih — tampilannya di atas kartu putih) |
| Kisah cinta | `index.html` — section `.section-story` (tahun, judul, cerita). Komentar `KONTEN DEMO` menandai bagian yang wajib diganti |
| Turut Mengundang | `index.html` — section `.section-turut` (nama keluarga/tamu kehormatan) |
| Dress code | `index.html` — section `.section-dresscode` (teks + warna swatch di `css/style.css`) |

## Musik latar

File **`assets/music.mp3` sudah disertakan**: *"Meditation Impromptu 01"* oleh Kevin MacLeod (incompetech.com), lisensi **CC BY 4.0** — bebas dipakai dengan atribusi (kredit sudah tertulis di footer situs). Durasi 3:33, 128 kbps, diputar loop dengan volume 0.5. Musik **mulai otomatis saat tamu mengetuk "Buka Undangan"** (gestur klik = syarat autoplay browser); tombol ♪ di pojok kanan bawah untuk pause/resume.

Untuk mengganti lagunya: timpa file `assets/music.mp3` dengan MP3 instrumental bebas lisensi lain (mis. dari Pixabay Music — lisensi bebas, tanpa atribusi). Jangan pakai lagu komersial berhak cipta.

## QRIS (sengaja tidak dibuat)

Paket ini **tidak menyertakan QRIS** — kode QR pembayaran tidak boleh dipalsukan. Untuk menambahkan QRIS asli: minta gambar QRIS dari bank/e-wallet mempelai, simpan sebagai `assets/qris.jpg`, lalu tambahkan satu kartu lagi di section Amplop Digital (`index.html`) dengan gambar tersebut. Jangan pernah memakai gambar QRIS contoh dari internet.

## Fitur

- **Sampul nama tamu** — nama tamu dari parameter URL `?to=Nama` (otomatis dibersihkan dari karakter HTML). Tanpa parameter, tampil "Tamu Undangan".
- **Ayat pembuka + salam** — Bismillah, QS. Ar-Rūm: 21 (Arab + terjemahan), salam Assalamu'alaikum.
- **Hitung mundur live** — hari/jam/menit/detik menuju akad (20 Des 2026, 08.00 WIB), diperbarui tiap detik.
- **Detail acara + kalender** — kartu Akad (08.00–10.00 WIB) dan Resepsi (11.00–14.00 WIB) + tombol Google Maps, tombol Google Calendar per acara, dan unduh `wedding.ics`.
- **Dress code** — swatch Navy & Gold (CSS murni), teks "Batik / Formal — nuansa Navy & Gold".
- **Galeri + lightbox** — 3 crop dari satu foto mockup asli; ketuk foto untuk memperbesar (GLightbox).
- **Kisah kami** — timeline 3 entri (2019 pertemuan, 2022 lamaran, 2026 pernikahan). KONTEN DEMO — wajib diganti kisah asli.
- **RSVP via WhatsApp** — nama wajib diisi; pesan terkirim ke 0812-3456-789 (wa.me/628123456789) dengan teks terisi otomatis.
- **Amplop digital** — DANA 0812-3456-789 + Bank BCA (CONTOH), masing-masing dengan tombol "Salin Nomor".
- **Turut Mengundang** — keluarga besar kedua belah pihak + tamu kehormatan (KONTEN DEMO).
- **Doa penutup** — sebelum footer.
- **Musik** — MP3 asli disertakan, autoplay saat "Buka Undangan", tombol toggle pause/resume.
- **Animasi scroll (AOS)** — tiap section muncul dengan fade-up. Kalau CDN AOS gagal dimuat, konten tetap terlihat (fallback di `js/script.js`).
- **Responsif** — nyaman di HP 360px ke atas; tombol besar, mudah ditekan.

## Yang berubah di v2 (Paket Premium, 11 Nov 2026)

Berdasarkan riset template undangan GitHub (model utama: `dewanakl/undangan`, 817★, MIT):

1. **Musik** — file MP3 asli disertakan + autoplay saat "Buka Undangan" (sebelumnya: tombol tanpa file).
2. **Tambah ke Kalender** — tombol Google Calendar di tiap kartu acara + file `wedding.ics` (baru).
3. **Ayat + salam + Turut Mengundang + doa penutup** — section baru di awal konten dan sebelum footer.
4. **AOS 2.3.4** — animasi fade-up di semua section (CDN unpkg, dengan fallback).
5. **GLightbox** — galeri bisa diperbesar (CDN jsdelivr). Foto tetap 1 foto asli yang sama — tidak ada foto baru.
6. **Dress code** — section baru, swatch Navy & Gold.
7. **QRIS — TIDAK dibuat** — sengaja dilewati karena tidak ada QRIS asli mempelai; memalsukan kode QR pembayaran adalah kesalahan fatal.
8. **Kisah cinta** — timeline 3 entri demo (2019/2022/2026), ditandai KONTEN DEMO.
9. **Font Great Vibes** — khusus untuk nama pasangan (sampul, hero, penutup); fallback cursive aman.

## Data demo yang dipakai

- Pengantin: **Raka & Sinta** (contoh)
- Tanggal: **Minggu, 20 Desember 2026**
- Akad: 08.00–10.00 WIB · Resepsi: 11.00–14.00 WIB
- Venue contoh: **Gedung Serbaguna, Jakarta** (alamat lengkap menyusul pada undangan cetak)
- WhatsApp RSVP: **0812-3456-789**
- DANA: **0812-3456-789**
- Bank BCA: **1234 5678 90 a.n. Raka Pratama — CONTOH, wajib diganti**

Dibuat oleh **infly** — Website Undangan.
