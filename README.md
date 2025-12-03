# BookletKu - Digital Menu & Ordering System

**BookletKu** adalah aplikasi Menu Digital modern berbasis web (SPA) yang dirancang untuk membantu pemilik bisnis F&B mengelola menu secara *real-time* dan menerima pesanan pelanggan langsung melalui WhatsApp tanpa perlu login atau aplikasi tambahan.

![Tech Stack](https://img.shields.io/badge/Tech-React%2019%20%7C%20Vite%20%7C%20Supabase-blue)
![Style](https://img.shields.io/badge/Style-Tailwind%20CSS%204-cyan)
![Status](https://img.shields.io/badge/Status-Active%20Development-green)

---

## 📋 Daftar Isi

- [Fitur Unggulan](#-fitur-unggulan)
- [Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [Struktur Folder](#-struktur-folder)
- [Persiapan Database](#️-persiapan-database)
- [Instalasi](#-instalasi)
- [Konfigurasi](#️-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Deployment](#-deployment)
- [Panduan Penggunaan](#-panduan-penggunaan)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🌟 Fitur Unggulan

### 📱 Tampilan Pelanggan (Guest View)
Pelanggan memindai QR Code dan langsung masuk ke halaman ini:
* **Katalog Interaktif:** Tampilan menu yang bersih dengan filter kategori otomatis
* **Keranjang Belanja:** Menambah/mengurangi item dengan kalkulasi harga otomatis
* **Checkout WhatsApp:** Pesanan diformat otomatis menjadi pesan WhatsApp dan dikirim ke nomor Admin
* **Multi-Tema:** Tersedia pilihan tema tampilan (*Colorful* & *Minimalist*)
* **Multi-Bahasa:** Dukungan Bahasa Indonesia & Inggris
* **Responsive Design:** Tampilan optimal di desktop, tablet, dan mobile

### 🏢 Dashboard Admin
Halaman khusus pemilik toko untuk mengelola operasional:
* **Manajemen Menu (CRUD):** Tambah, edit, dan hapus menu dengan fitur upload gambar
* **Drag & Drop Sorting:** Atur urutan tampilan menu cukup dengan digeser (*drag-and-drop*)
* **Statistik & Grafik:** Pantau estimasi omzet, total item, dan jumlah pengunjung
* **QR Code Generator:** Otomatis membuat QR Code unik untuk toko Anda
* **Pengaturan Toko:** Ganti nomor WhatsApp tujuan dan tema aplikasi secara *real-time*
* **Real-time Sync:** Perubahan langsung terlihat tanpa perlu refresh halaman

---

## 🛠️ Teknologi yang Digunakan

### Frontend
* **[React.js v19](https://react.dev/)** - Library JavaScript untuk membangun UI
* **[Vite v7](https://vitejs.dev/)** - Build tool modern yang cepat
* **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
* **[React Router v7](https://reactrouter.com/)** - Routing untuk SPA

### Backend & Database
* **[Supabase](https://supabase.com/)** - Backend-as-a-Service (PostgreSQL)
  - Authentication
  - Real-time subscriptions
  - Storage untuk upload gambar
  - RESTful API

### Libraries Utama
* `@dnd-kit/core`, `@dnd-kit/sortable` - Drag & Drop interface
* `recharts` - Visualisasi data dan grafik
* `qrcode.react` - Generator QR Code
* `lucide-react` - Icon set
* `uuid` - Generate unique ID

---

## 📁 Struktur Folder

```
vibecoding-digital-menu/
│
├── public/                          # File statis publik
│   └── vite.svg                     # Logo Vite
│
├── src/                             # Source code utama
│   │
│   ├── assets/                      # Asset statis (gambar, font, dll)
│   │   └── react.svg                # Logo React
│   │
│   ├── components/                  # Komponen React reusable
│   │   └── ImageUploader.jsx        # Komponen upload gambar ke Supabase Storage
│   │
│   ├── pages/                       # Halaman utama aplikasi
│   │   ├── addmenu.jsx              # Halaman Manajemen Menu (CRUD + Drag&Drop)
│   │   ├── dashboard.jsx            # Dashboard Admin (Statistik + QR + Settings)
│   │   └── preview.jsx              # Halaman Tampilan Pelanggan (Multi-tema)
│   │
│   ├── routes/                      # Konfigurasi routing
│   │   ├── AppRoutes.jsx            # Definisi semua route aplikasi
│   │   └── index.jsx                # Router wrapper & renderer
│   │
│   ├── styles/                      # File styling global
│   │   ├── fonts.css                # Custom fonts (kosong - bisa ditambahkan)
│   │   └── global.css               # Global styles + Tailwind imports
│   │
│   ├── utils/                       # Utility functions & configurations
│   │   └── supabase.js              # Konfigurasi Supabase client
│   │
│   └── main.jsx                     # Entry point React aplikasi
│
├── .gitignore                       # File yang diabaikan Git
├── eslint.config.js                 # Konfigurasi ESLint
├── index.html                       # HTML template
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Lock file dependencies
├── README.md                        # Dokumentasi proyek
├── vercel.json                      # Konfigurasi deployment Vercel
└── vite.config.js                   # Konfigurasi Vite
```

### Detail Struktur

#### `/src/components/`
**ImageUploader.jsx**
- Komponen untuk upload gambar menu
- Menggunakan Supabase Storage bucket `menu-buckets`
- Generate URL publik otomatis
- Validasi file gambar
- Loading state management

#### `/src/pages/`
**addmenu.jsx**
- Form input menu baru (nama, harga, deskripsi, kategori, gambar)
- List menu dengan drag & drop untuk sorting
- Filter dan search menu
- Delete menu
- Responsive layout (form sidebar desktop, toggle mobile)
- Real-time update ke Supabase

**dashboard.jsx**
- Card statistik (Total Penjualan, Total Item, Pengunjung, Leads)
- Grafik penjualan harian (Line Chart)
- QR Code generator untuk link menu pelanggan
- Setting nomor WhatsApp admin
- Tanggal real-time
- Notifikasi toast
- Sidebar navigasi

**preview.jsx**
- Tampilan menu untuk pelanggan
- Filter kategori menu
- Keranjang belanja dengan quantity
- Checkout ke WhatsApp
- Tema: Colorful (Coffee & Caramel) & Minimalist (Purple/Blue)
- Multi-bahasa (Indonesia & English)
- Real-time sync dengan Supabase
- Responsive (mobile cart fixed bottom)

#### `/src/routes/`
**AppRoutes.jsx**
- Definisi route utama: `/` (Dashboard), `/AddMenu`, `/Preview/:id`
- Nested routing structure
- Route guard (requireAuth)

**index.jsx**
- Router renderer dengan React Router
- Lazy loading support
- Suspense fallback

#### `/src/utils/`
**supabase.js**
- Initialize Supabase client
- Konfigurasi URL dan API Key
- Export untuk digunakan di seluruh aplikasi

---

## 🗄️ Persiapan Database

### 1. Setup Supabase Project
1. Buat akun di [Supabase](https://supabase.com/)
2. Buat project baru
3. Copy **Project URL** dan **Anon/Public Key**

### 2. Buat Tabel Database

Buka **SQL Editor** di dashboard Supabase dan jalankan perintah berikut:

#### Tabel: `menu_items`
```sql
CREATE TABLE menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  "Harga" NUMERIC NOT NULL,
  "Deskripsi" TEXT,
  "Kategori" TEXT,
  foto_url TEXT,
  "order" INTEGER DEFAULT 0
);
```

#### Tabel: `user_settings`
```sql
CREATE TABLE user_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  template TEXT DEFAULT 'Colorful',
  whatsapp_number TEXT DEFAULT '6281xxxxxx',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

#### Insert Default Settings
```sql
INSERT INTO user_settings (user_id, template, whatsapp_number)
VALUES ('user_unique_id_123', 'Colorful', '082229081327');
```

### 3. Setup Storage Bucket

1. Buka **Storage** di dashboard Supabase
2. Buat bucket baru dengan nama: `menu-buckets`
3. Set bucket sebagai **Public** (agar gambar bisa diakses langsung)
4. Atur policy:
   ```sql
   -- Policy untuk upload
   CREATE POLICY "Allow upload for authenticated users"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'menu-buckets');

   -- Policy untuk public access
   CREATE POLICY "Allow public access"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'menu-buckets');
   ```

### 4. Enable Real-time

1. Buka **Database** > **Replication**
2. Enable real-time untuk tabel:
   - `menu_items`
   - `user_settings`

---

## 📦 Instalasi

### Prasyarat
- **Node.js** >= 20.19.0 atau >= 22.12.0
- **npm** atau **yarn** atau **pnpm**
- Akun Supabase

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/bookletku.git
   cd bookletku
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Setup Environment Variables**
   
   Buat file `.env` di root folder:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Update Supabase Config**
   
   Edit file `src/utils/supabase.js`:
   ```javascript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

---

## ⚙️ Konfigurasi

### Konfigurasi User ID

Edit file `src/pages/dashboard.jsx`:
```javascript
const CURRENT_USER_ID = "user_unique_id_123"; // Ganti dengan ID unik Anda
```

### Konfigurasi Storage Bucket

Edit file `src/components/ImageUploader.jsx`:
```javascript
const BUCKET_NAME = "menu-buckets"; // Pastikan sama dengan nama bucket Supabase
```

### Konfigurasi WhatsApp Default

Edit di dashboard atau langsung di database:
```sql
UPDATE user_settings
SET whatsapp_number = '6281234567890'
WHERE user_id = 'user_unique_id_123';
```

---

## 🚀 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:5173`

### Build Production

```bash
npm run build
```

Output akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🌐 Deployment

### Deploy ke Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   
   Di dashboard Vercel, tambahkan:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy ke Netlify

1. Install Netlify CLI
   ```bash
   npm i -g netlify-cli
   ```

2. Build & Deploy
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Konfigurasi Redirects

File `vercel.json` sudah disertakan untuk handling SPA routing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📖 Panduan Penggunaan

### Untuk Admin

1. **Akses Dashboard**
   - Buka URL: `https://your-domain.com/`
   - Lihat statistik penjualan dan pengunjung

2. **Tambah Menu Baru**
   - Klik tombol "Tambah Menu" di sidebar
   - Atau langsung ke: `https://your-domain.com/AddMenu`
   - Isi form:
     - Nama menu (wajib)
     - Harga (wajib, format: 18000)
     - Deskripsi (opsional)
     - Kategori (pilih: Makanan/Minuman/Dessert/Snack)
     - Upload gambar (opsional)
   - Klik "Tambah Menu Sekarang"

3. **Atur Urutan Menu**
   - Drag & drop card menu untuk mengubah urutan
   - Perubahan otomatis tersimpan

4. **Hapus Menu**
   - Klik tombol "✕ Hapus" pada card menu

5. **Filter & Search**
   - Gunakan search bar untuk cari nama/deskripsi
   - Filter berdasarkan kategori

6. **Setting WhatsApp**
   - Di dashboard, bagian "Setting No Admin Default"
   - Masukkan nomor format: 6281234567890
   - Klik "Simpan"

7. **Generate QR Code**
   - QR Code otomatis muncul di dashboard
   - Download atau print untuk dipajang di toko

8. **Ganti Tema**
   - Buka preview: `https://your-domain.com/Preview/user_unique_id_123`
   - Pilih tema: Colorful atau Minimalist
   - Tema otomatis tersimpan dan terlihat pelanggan

### Untuk Pelanggan

1. **Akses Menu**
   - Scan QR Code atau buka link
   - Menu langsung muncul

2. **Filter Menu**
   - Klik kategori di sidebar (desktop) atau top (mobile)
   - Pilih "Semua" untuk lihat semua menu

3. **Ganti Bahasa**
   - Klik tombol "ID" atau "EN" di sidebar

4. **Tambah ke Keranjang**
   - Klik tombol "+ Tambah" pada menu
   - Lihat keranjang di sidebar kanan (desktop) atau bottom sheet (mobile)

5. **Atur Quantity**
   - Klik tombol "+" untuk tambah
   - Klik tombol "-" untuk kurang
   - Otomatis terhapus jika quantity 0

6. **Checkout**
   - Klik "WhatsApp Pesan Sekarang"
   - Otomatis membuka WhatsApp dengan format pesanan
   - Kirim ke admin

---

## 🐛 Troubleshooting

### Gambar Tidak Muncul

**Penyebab:** Bucket tidak public atau URL salah

**Solusi:**
1. Pastikan bucket `menu-buckets` sudah public
2. Cek policy storage di Supabase
3. Verifikasi URL gambar di database

### Real-time Tidak Berfungsi

**Penyebab:** Real-time belum diaktifkan

**Solusi:**
1. Buka Supabase Dashboard > Database > Replication
2. Enable untuk tabel `menu_items` dan `user_settings`
3. Refresh halaman aplikasi

### Build Error

**Penyebab:** Dependencies versi tidak sesuai

**Solusi:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### WhatsApp Checkout Tidak Berfungsi

**Penyebab:** Format nomor salah

**Solusi:**
- Format harus: 6281234567890 (awali 62, tanpa +, tanpa spasi)
- Pastikan nomor tersimpan di database

### Drag & Drop Tidak Smooth

**Penyebab:** Browser tidak support atau JS error

**Solusi:**
1. Gunakan browser modern (Chrome, Firefox, Edge)
2. Cek console untuk error
3. Clear cache browser

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

### Coding Standards

- Gunakan ESLint config yang sudah ada
- Ikuti struktur folder yang ada
- Tulis komentar untuk kode kompleks
- Test di mobile dan desktop sebelum PR

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 📞 Kontak & Support

- **Email:** support@bookletku.com
- **GitHub Issues:** [github.com/username/bookletku/issues](https://github.com/username/bookletku/issues)
- **Website:** [bookletku.com](https://bookletku.com)

---

## 🙏 Credits

Dibuat dengan ❤️ menggunakan:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Recharts](https://recharts.org/)
- [dnd-kit](https://dndkit.com/)

---

**Terakhir diupdate:** Desember 2024  
**Versi:** 1.0.0  
**Status:** ✅ Production Ready
