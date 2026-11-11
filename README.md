# Website Undangan — Raka & Sinta (infly)

Undangan pernikahan digital satu halaman, dibuat dengan **HTML + CSS + JavaScript vanilla** — tanpa framework, tanpa build step, tanpa backend. Siap di-hosting gratis di **GitHub Pages**.

Tema: **Navy & Gold Elegan** (navy `#1F3864`, gold `#C9A227`, ivory `#FAF6EF`) — sama seperti brand infly di proposal dan flyer.

## Isi paket

```
website-undangan-infly/
├── index.html          # Struktur + semua teks undangan
├── css/
│   └── style.css       # Semua tampilan (Navy & Gold, mobile-first)
├── js/
│   └── script.js       # Nama tamu, countdown, RSVP, salin nomor, musik
├── assets/
│   ├── logo-infly.png      # Logo infly (amplop bersayap, latar putih)
│   └── foto-pasangan.jpg   # Foto mockup undangan asli (cincin, mawar, ponsel)
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

**Catatan:** semua path di situs ini relatif (`assets/...`, `css/...`, `js/...`), jadi situs jalan baik di root domain maupun di subpath GitHub Pages.

## Cara mengganti data demo menjadi data asli

Semua teks ada di `index.html` — edit langsung dengan teks editor apa pun. Yang paling sering diganti:

| Yang diganti | Di mana |
|---|---|
| Nama pengantin (Raka & Sinta) | `index.html` — bagian sampul, hero, dan penutup |
| Nama orang tua | `index.html` — bagian hero (`.hero-parents`) |
| Tanggal & jam acara | `index.html` (tampilan) **dan** `js/script.js` (hitung mundur: ubah `new Date("2026-12-20T01:00:00Z")` — jam di sini UTC, jadi 08.00 WIB = 01.00 UTC) |
| Nama gedung / alamat | `index.html` — kartu acara, dan tautan Google Maps (ganti `query=Gedung+Serbaguna+Jakarta`) |
| Nomor WhatsApp RSVP | `js/script.js` — ubah `WA_NUMBER` (format internasional tanpa `+`, mis. `62812xxxxxxx`) |
| Nomor DANA | `index.html` — kartu amplop digital (teks yang tampil **dan** `data-copy`) |
| Nomor rekening bank | `index.html` — kartu Bank BCA. **Wajib ganti:** nomor `1234 5678 90` adalah **NOMOR CONTOH**, bukan nomor asli |
| Foto galeri / foto hero | Ganti file `assets/foto-pasangan.jpg` dengan foto asli (nama file tetap sama, atau ubah `src` di `index.html`) |
| Logo | Ganti file `assets/logo-infly.png` (logo harus berlatar putih — tampilannya di atas kartu putih) |

## Cara menambahkan musik latar

File musik **tidak disertakan** dalam paket (alasan lisensi). Untuk menambahkannya:

1. Siapkan file MP3 instrumental bebas lisensi (mis. dari Pixabay Music — lisensi bebas, tanpa atribusi).
2. Simpan dengan nama **`music.mp3`** di folder **`assets/`**.
3. Selesai — tombol musik (♪) di pojok kanan bawah akan langsung berfungsi. Tombol memutar/menghentikan musik; musik berputar otomatis (loop).
4. Kalau file belum ada, tombol akan menampilkan pemberitahuan *"File musik belum ditambahkan"* — situs tetap jalan normal.

## Fitur

- **Sampul nama tamu** — nama tamu dari parameter URL `?to=Nama` (otomatis dibersihkan dari karakter HTML). Tanpa parameter, tampil "Tamu Undangan".
- **Hitung mundur live** — hari/jam/menit/detik menuju akad (20 Des 2026, 08.00 WIB), diperbarui tiap detik.
- **Detail acara** — kartu Akad (08.00–10.00 WIB) dan Resepsi (11.00–14.00 WIB) + tombol Google Maps.
- **Galeri** — 3 crop dari satu foto mockup asli.
- **RSVP via WhatsApp** — nama wajib diisi; pesan terkirim ke 0812-3456-789 (wa.me/628123456789) dengan teks terisi otomatis.
- **Amplop digital** — DANA 0812-3456-789 + Bank BCA (CONTOH), masing-masing dengan tombol "Salin Nomor".
- **Musik** — tombol toggle + elemen `<audio>` (file `assets/music.mp3` ditambahkan sendiri).
- **Responsif** — nyaman di HP 360px ke atas; tombol besar, mudah ditekan.

## Data demo yang dipakai

- Pengantin: **Raka & Sinta** (contoh)
- Tanggal: **Minggu, 20 Desember 2026**
- Akad: 08.00–10.00 WIB · Resepsi: 11.00–14.00 WIB
- Venue contoh: **Gedung Serbaguna, Jakarta** (alamat lengkap menyusul pada undangan cetak)
- WhatsApp RSVP: **0812-3456-789**
- DANA: **0812-3456-789**
- Bank BCA: **1234 5678 90 a.n. Raka Pratama — CONTOH, wajib diganti**

Dibuat oleh **infly** — Website Undangan.
