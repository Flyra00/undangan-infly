# Website Undangan — Raka & Sinta (infly)

Undangan pernikahan digital satu halaman, dibuat dengan **HTML + CSS + JavaScript vanilla** — tanpa framework, tanpa build step, tanpa backend. Siap di-hosting gratis di **GitHub Pages**.

Tema v3: **Serein — terang, lapang, mewah restrained** (dasar ivory hangat `#FDF8F0`, teks charcoal, navy `#1F3864` HANYA sebagai aksen, gold `#C9A227` untuk hairline) — referensi desain: demo Wevitation "Serein". Motif arch (lengkung) di foto dan kartu RSVP, bingkai double hairline, hierarki ukuran besar-kecil yang jelas.

> **v3 Redesign (12 Nov 2026):** rombak total gaya Serein — cover terang + loader, hero foto full-bleed Ken Burns, split panel desktop, bottom nav mengambang, carousel galeri + kisah cinta, modal RSVP/Kado, live streaming, protokol kesehatan. Lihat "Yang berubah di v3" di bawah.

## Isi paket

```
website-undangan-infly/
├── index.html          # Struktur + semua teks undangan
├── wedding.ics         # File kalender (akad + resepsi) untuk diunduh tamu
├── css/
│   └── style.css       # Semua tampilan (Serein: ivory, arch, split panel)
├── js/
│   └── script.js       # Nama tamu, countdown, RSVP, salin nomor, musik,
│                       # loader, carousel, modal, bottom nav, back-to-top
├── assets/
│   ├── logo-infly.png      # Logo infly (amplop bersayap, latar putih)
│   ├── foto-pasangan.jpg   # Foto mockup undangan asli (cincin, mawar, ponsel)
│   └── music.mp3           # "Meditation Impromptu 01" — Kevin MacLeod, CC BY 4.0
└── README.md           # File ini
```

**Tidak ada gambar AI** di paket ini. Logo dan foto adalah aset asli dari proposal infly. Galeri memakai 3 crop berbeda (CSS `object-position`) dari satu foto yang sama — bukan gambar lain dari internet. Foto hero adalah foto dekorasi/cincin (mockup), **bukan foto pasangan** — keterangannya tertulis di bawah foto hero.

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
| Nama pengantin (Raka & Sinta) | `index.html` — sampul, hero, panel kiri, dan penutup |
| Nama orang tua | `index.html` — section Mempelai (`.couple-parents`) |
| Tanggal & jam acara | `index.html` (tampilan) **dan** `js/script.js` (hitung mundur: ubah `new Date("2026-12-20T01:00:00Z")` — jam di sini UTC, jadi 08.00 WIB = 01.00 UTC) **dan** `wedding.ics` (DTSTART/DTEND) **dan** tautan Google Calendar di `index.html` (parameter `dates=`) |
| Nama gedung / alamat | `index.html` — kartu acara, dan tautan Google Maps (ganti `query=Gedung+Serbaguna+Jakarta`) |
| Nomor WhatsApp RSVP | `js/script.js` — ubah `WA_NUMBER` (format internasional tanpa `+`, mis. `62812xxxxxxx`) |
| Nomor DANA | `index.html` — accordion Kado di modal (teks yang tampil **dan** `data-copy`) |
| Nomor rekening bank | `index.html` — accordion Kado di modal, Bank BCA. **Wajib ganti:** nomor `1234 5678 90` adalah **NOMOR CONTOH**, bukan nomor asli |
| Foto hero & galeri | Ganti file `assets/foto-pasangan.jpg` dengan foto asli (nama file tetap sama, atau ubah `src` di `index.html`). Foto pasangan asli bisa dipasang sebagai foto hero; hapus caption "foto pasangan menyusul" kalau sudah memakai foto asli |
| Logo | Ganti file `assets/logo-infly.png` (logo harus berlatar putih — tampilannya di atas kartu putih) |
| Kisah cinta | `index.html` — section Kisah Kami (tahun, judul, cerita). Komentar `KONTEN DEMO` menandai bagian yang wajib diganti |
| Turut Mengundang | `index.html` — section Turut Mengundang (nama keluarga/tamu kehormatan) |
| Dress code | `index.html` — section Dress Code (teks + warna swatch di `css/style.css`) |
| Tautan live streaming | `index.html` — section Live Streaming (ganti catatan "akan dibagikan" dengan tautan asli menjelang hari acara) |

## Musik latar

File **`assets/music.mp3` sudah disertakan**: *"Meditation Impromptu 01"* oleh Kevin MacLeod (incompetech.com), lisensi **CC BY 4.0** — bebas dipakai dengan atribusi (kredit sudah tertulis di footer situs). Durasi 3:33, 128 kbps, diputar loop dengan volume 0.5. Musik **mulai otomatis saat tamu mengetuk "Buka Undangan"** (gestur klik = syarat autoplay browser); tombol ♪ di pojok **kanan atas** untuk pause/resume.

Untuk mengganti lagunya: timpa file `assets/music.mp3` dengan MP3 instrumental bebas lisensi lain (mis. dari Pixabay Music — lisensi bebas, tanpa atribusi). Jangan pakai lagu komersial berhak cipta.

## QRIS (sengaja tidak dibuat)

Paket ini **tidak menyertakan QRIS** — kode QR pembayaran tidak boleh dipalsukan. Untuk menambahkan QRIS asli: minta gambar QRIS dari bank/e-wallet mempelai, simpan sebagai `assets/qris.jpg`, lalu tambahkan satu accordion lagi di modal Kado (`index.html`) dengan gambar tersebut. Jangan pernah memakai gambar QRIS contoh dari internet.

## Fitur (v3)

- **Loader** — "Memuat Undangan…" singkat saat halaman dimuat.
- **Sampul terang** — ivory + nama script besar + "Kepada: [nama tamu ?to=]" + tombol pill navy "Buka Undangan".
- **Split panel desktop** — layar ≥1024px: panel kiri fixed berisi "The Wedding of Raka & Sinta" + titik-titik melayang halus; undangan scroll di kolom kanan sempit (~640px). Di HP: satu kolom biasa.
- **Hero foto full-bleed + Ken Burns** — foto mockup asli dengan zoom pelan, nama besar + tanggal di atasnya. Caption jujur: foto dekorasi, foto pasangan menyusul.
- **Hitung mundur live** — angka serif Playfair besar, hari/jam/menit/detik menuju akad (20 Des 2026, 08.00 WIB).
- **Ayat pembuka + salam** — Bismillah, QS. Ar-Rūm: 21 (Arab + terjemahan), salam Assalamu'alaikum.
- **Mempelai** — frame arch + monogram "R" & "S" (tanpa foto — bukan foto mereka) + nama orang tua.
- **Detail acara + kalender** — kartu Akad (08.00–10.00 WIB) dan Resepsi (11.00–14.00 WIB) bentuk arch + tombol Google Maps, Google Calendar per acara, dan unduh `wedding.ics`.
- **Live streaming** — kartu berbingkai; tautan dibagikan menjelang hari acara (tanpa link palsu).
- **Dress code** — kartu berbingkai, swatch Navy & Gold, "Batik / Formal — nuansa Navy & Gold".
- **Galeri carousel** — 3 crop foto mockup asli; autoplay 5 detik + panah + dot + thumbnail strip; ketuk foto untuk memperbesar (GLightbox).
- **Kisah kami carousel** — 3 kartu demo (2019/2022/2026) geser horizontal + progress bar. KONTEN DEMO — wajib diganti kisah asli.
- **RSVP modal** — kartu arch navy "Konfirmasi Kehadiran" → modal berisi form (nama, hadir/tidak, jumlah tamu, ucapan) → kirim via WhatsApp ke 0812-3456-789.
- **Kado modal** — tombol "Kirim Kado" → modal accordion DANA 0812-3456-789 + Bank BCA (CONTOH), masing-masing tombol "Salin Nomor".
- **Protokol kesehatan** — 4 item (badan sehat, kebersihan area, etika batuk/bersin, saling menghormati).
- **Turut Mengundang** — keluarga besar kedua belah pihak + tamu kehormatan (KONTEN DEMO).
- **Doa penutup** — sebelum footer navy.
- **Bottom nav mengambang** — 5 ikon (Undangan, Mempelai, Galeri, Kado, RSVP); ikon aktif mengikuti section saat scroll.
- **Back-to-top** — muncul setelah scroll 600px.
- **Musik** — MP3 asli disertakan, autoplay saat "Buka Undangan", tombol toggle di pojok kanan atas (tidak bertabrakan dengan bottom nav).
- **Animasi scroll (AOS)** — tiap section muncul dengan fade-up. Kalau CDN AOS gagal dimuat, konten tetap terlihat (fallback di `js/script.js`).
- **Responsif** — nyaman di HP 360px ke atas; tombol besar, mudah ditekan.

## Yang berubah di v3 (Redesign Serein, 12 Nov 2026)

Referensi: demo Wevitation "Serein" (wevitation.com/demo/serein), dipelajari via browser 12 Nov 2026.

1. **Palet dibalik** — dasar ivory hangat `#FDF8F0`, navy hanya aksen (sebelumnya cover navy penuh).
2. **Tipografi baru** — Playfair Display untuk judul + angka countdown; Great Vibes tetap untuk nama; Jost untuk isi & label caps ber-spasi.
3. **Loader** — "Memuat Undangan…" (baru).
4. **Hero foto full-bleed + Ken Burns** — foto mockup asli dengan zoom pelan (sebelumnya foto kecil di bawah teks).
5. **Split panel desktop** — panel kiri fixed + titik melayang (baru, ≥1024px).
6. **Motif arch + double hairline** — foto, kartu acara, kartu RSVP, dan bingkai konten (baru).
7. **Bottom nav mengambang + back-to-top** — 5 ikon, aktif mengikuti scroll (baru).
8. **Galeri carousel** — autoplay + panah + dot + thumbnail (sebelumnya grid statis 3 foto).
9. **Kisah cinta carousel** — horizontal + progress bar (sebelumnya timeline vertikal).
10. **Modal RSVP + Kado** — form RSVP dan accordion amplop pindah ke modal (sebelumnya inline di halaman).
11. **Live streaming + protokol kesehatan** — section baru.
12. **Musik pindah ke pojok kanan atas** — supaya tidak bertabrakan dengan bottom nav.
13. **TIDAK dikerjakan (batasan statis):** QR check-in per tamu, wishes wall publik, gift registry (butuh backend); foto couple asli (tidak ada — foto hero adalah foto dekorasi mockup, keterangannya tertulis di situs).

## Data demo yang dipakai

- Pengantin: **Raka & Sinta** (contoh)
- Tanggal: **Minggu, 20 Desember 2026**
- Akad: 08.00–10.00 WIB · Resepsi: 11.00–14.00 WIB
- Venue contoh: **Gedung Serbaguna, Jakarta** (alamat lengkap menyusul pada undangan cetak)
- WhatsApp RSVP: **0812-3456-789**
- DANA: **0812-3456-789**
- Bank BCA: **1234 5678 90 a.n. Raka Pratama — CONTOH, wajib diganti**

Dibuat oleh **infly** — Website Undangan.
