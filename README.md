# BookletKu - Digital Menu & Ordering System

**BookletKu** adalah aplikasi Menu Digital modern berbasis web (SPA) yang dirancang untuk membantu pemilik bisnis F&B mengelola menu secara *real-time* dan menerima pesanan pelanggan langsung melalui WhatsApp tanpa perlu login atau aplikasi tambahan.

![Tech Stack](https://img.shields.io/badge/Tech-React%2019%20%7C%20Vite%20%7C%20Supabase-blue)
![Style](https://img.shields.io/badge/Style-Tailwind%20CSS%204-cyan)
![Status](https://img.shields.io/badge/Status-Active%20Development-green)

---

## 🌟 Fitur Unggulan

### 📱 Tampilan Pelanggan (Guest View)
Pelanggan memindai QR Code dan langsung masuk ke halaman ini:
* **Katalog Interaktif:** Tampilan menu yang bersih dengan filter kategori otomatis.
* **Keranjang Belanja:** Menambah/mengurangi item dengan kalkulasi harga otomatis.
* **Checkout WhatsApp:** Pesanan diformat otomatis menjadi pesan WhatsApp dan dikirim ke nomor Admin.
* **Multi-Tema:** Tersedia pilihan tema tampilan (*Colorful* & *Minimalist*).
* **Multi-Bahasa:** Dukungan Bahasa Indonesia & Inggris.

### 🏢 Dashboard Admin
Halaman khusus pemilik toko untuk mengelola operasional:
* **Manajemen Menu (CRUD):** Tambah, edit, dan hapus menu dengan fitur upload gambar.
* **Drag & Drop Sorting:** Atur urutan tampilan menu cukup dengan digeser (*drag-and-drop*).
* **Statistik & Grafik:** Pantau estimasi omzet, total item, dan jumlah pengunjung.
* **QR Code Generator:** Otomatis membuat QR Code unik untuk toko Anda.
* **Pengaturan Toko:** Ganti nomor WhatsApp tujuan dan tema aplikasi secara *real-time*.

---

## 🛠️ Teknologi yang Digunakan

* **Frontend:** [React.js v19](https://react.dev/)
* **Build Tool:** [Vite v7](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Backend & Database:** [Supabase](https://supabase.com/)
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Libraries Utama:**
  * `recharts` (Visualisasi Data)
  * `@dnd-kit` (Drag & Drop Interface)
  * `qrcode.react` (QR Code Generator)
  * `lucide-react` (Ikon)

---

## 🗄️ Persiapan Database (Wajib)

Sebelum menjalankan aplikasi, Anda harus menyiapkan database di **Supabase**. Buka menu **SQL Editor** di dashboard Supabase Anda dan jalankan perintah berikut satu per satu:

### 1. Buat Tabel `menu_items`
```sql
create table menu_items (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  "Harga" numeric not null,
  "Deskripsi" text,
  "Kategori" text,
  foto_url text,
  "order" integer default 0
);
