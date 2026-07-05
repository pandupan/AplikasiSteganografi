# Aplikasi Steganografi 🔐

> **Aplikasi penyembunyian pesan dalam gambar menggunakan metode AES-LSB**

**Aplikasi Steganografi** adalah platform web untuk menyembunyikan (*embedding*) dan mengekstrak pesan rahasia ke dalam gambar digital. Menggabungkan **enkripsi AES** untuk keamanan pesan dengan **metode LSB (Least Significant Bit)** untuk menyembunyikan data dalam pixel gambar.

---

## ✨ Fitur Utama

- **🔒 Enkripsi AES** — Pesan dienkripsi dengan algoritma AES sebelum disembunyikan
- **🖼️ Steganografi LSB** — Penyembunyian data dalam bit terendah pixel gambar
- **📤 Embedding** — Sembunyikan pesan rahasia ke dalam gambar
- **📥 Ekstraksi** — Baca pesan tersembunyi dari gambar stego
- **🎨 UI Modern** — Antarmuka dengan Tailwind CSS + Flowbite
- **⚡ Animasi** — Transisi halus dengan Framer Motion
- **📱 Responsive** — Tampilan optimal di semua perangkat

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **UI:** Tailwind CSS 3, Flowbite React, Headless UI
- **Kriptografi:** crypto-js (AES), blowfish-node
- **Animasi:** Framer Motion
- **Notifikasi:** React Toastify
- **Ikon:** Heroicons

---

## 🚀 Cara Install & Jalankan

### Prasyarat
- Node.js 18+

### Langkah
```bash
# Clone repositori
git clone https://github.com/pandupan/AplikasiSteganografi.git
cd AplikasiSteganografi

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Folder

```
AplikasiSteganografi/
├── app/
│   ├── page.tsx              # Halaman utama
│   ├── layout.tsx            # Layout root
│   └── globals.css           # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Navigasi
│   │   └── Footer.tsx        # Footer
│   ├── lib/
│   │   └── animate.ts        # Animasi helper
│   └── pages/
│       └── landing-page/     # Komponen landing page
│           ├── Hero.tsx
│           ├── About.tsx
│           ├── Service.tsx
│           ├── Project.tsx
│           └── Contact.tsx
├── constants/
│   └── index.ts              # Konstanta & data kontak
├── public/
│   └── images/
└── package.json
```

## 📄 Lisensi

**MIT License**

---

> Dibuat oleh [Pandu Pangestu](https://github.com/pandupan) — Proyek steganografi untuk keamanan dan privasi data.
