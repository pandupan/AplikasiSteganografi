# 🔐 Aplikasi Steganografi — Sembunyikan Pesan dalam Gambar

Aplikasi **steganografi** untuk menyembunyikan dan mengekstrak pesan rahasia di dalam media gambar. Menggabungkan konsep steganografi dengan enkripsi Blowfish untuk **keamanan ganda** — pesan dienkripsi dulu, lalu disembunyikan dalam gambar.

## ✨ Fitur

- **Penyisipan (Embed)** — Sembunyikan teks rahasia ke dalam gambar (PNG/JPG)
- **Ekstraksi (Extract)** — Baca & dekripsi pesan tersembunyi dari gambar
- **Enkripsi Blowfish** — Pesan dienkripsi sebelum disisipkan (`blowfish-node`)
- **Keamanan Ganda** — Steganografi + Kriptografi = perlindungan maksimal
- **UI Modern** — Antarmuka intuitif dengan animasi

### Cara Kerja
1. **Enkripsi** → Pesan dienkripsi menggunakan algoritma Blowfish
2. **Penyisipan** → Hasil enkripsi disembunyikan ke dalam pixel gambar (LSB)
3. **Ekstraksi** → Pesan diekstrak dari gambar
4. **Dekripsi** → Pesan didekripsi kembali ke teks asli

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Enkripsi** | Blowfish (`blowfish-node`) |
| **UI** | shadcn/ui, Headless UI |
| **Icons** | Heroicons |

## 📁 Struktur Proyek

```
app/
├── page.tsx                  # Landing page
├── layout.tsx                # Root layout
└── globals.css               # Global styles

components/
├── layout/
│   ├── Header.tsx            # Navigasi
│   └── Footer.tsx
├── lib/
│   └── animate.ts            # Animasi utility
└── pages/landing-page/
    ├── Hero.tsx              # Hero section
    ├── About.tsx             # Penjelasan steganografi
    ├── Project.tsx           # Demo/tools
    ├── Service.tsx           # Layanan
    └── Contact.tsx           # Kontak

constants/index.ts            # Data statis

public/images/
├── hero-section1.png         # Gambar hero
├── hero.jpg                  # Hero background
├── secure.jpg                # Ilustrasi keamanan
└── logo.png                  # Logo aplikasi
```

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📄 Lisensi

MIT License

---

> Dibuat oleh [Pandu Pangestu](https://github.com/pandupan)
