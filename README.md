# 🏠 HomeByte — Sistem Informasi Terintegrasi Properti

HomeByte adalah platform manajemen properti berbasis web yang dibangun menggunakan **Next.js**, **Prisma ORM**, dan **PostgreSQL (Neon)**. Proyek ini mengintegrasikan beberapa modul bisnis: **Aplikasi Utama**, **CRM**, dan **HR** dalam satu ekosistem menggunakan **Docker Compose** dan **Traefik** sebagai reverse proxy.

---

## 📋 Daftar Isi

- [Prasyarat](#-prasyarat)
- [Struktur Proyek](#-struktur-proyek)
- [Cara Menjalankan (Docker Compose)](#-cara-menjalankan-docker-compose)
- [Akses Layanan](#-akses-layanan)
- [Akun & Login](#-akun--login)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Cara Menjalankan Tanpa Docker (Opsional)](#-cara-menjalankan-tanpa-docker-opsional)

---

## 🔧 Prasyarat

Pastikan perangkat lunak berikut sudah terinstal di komputer Anda:

| Software | Versi Minimum | Link Download |
|----------|---------------|---------------|
| **Docker Desktop** | 4.x | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |
| **Git** | 2.x | [git-scm.com](https://git-scm.com/) |

> **Catatan:** Jika menggunakan Docker, Anda **tidak perlu** menginstal Node.js secara terpisah karena Node.js sudah tersedia di dalam container Docker.

---

## 📁 Struktur Proyek

```
HomeByte/
├── src/                    # Kode sumber aplikasi utama (Next.js 16)
│   ├── app/                # Halaman aplikasi (App Router)
│   │   ├── admin/          # Dashboard Admin (properti, pengguna, SCM, pesan)
│   │   ├── api/            # API Routes
│   │   ├── contact/        # Halaman Hubungi Kami
│   │   ├── properties/     # Halaman daftar & detail properti
│   │   └── ...
│   ├── components/         # Komponen UI (Navbar, Sidebar, Form, dll.)
│   └── lib/                # Utility (Prisma client, Server Actions, dll.)
├── services/
│   ├── crm/                # Microservice CRM (Next.js, port 3001)
│   └── hr/                 # Microservice HR (Next.js, port 3002)
├── prisma/
│   └── schema.prisma       # Skema database (PostgreSQL)
├── docker-compose.yml      # Konfigurasi Docker Compose
├── Dockerfile              # Dockerfile aplikasi utama
├── .env                    # Environment variables (database, auth, dll.)
└── README.md               # Dokumentasi ini
```

---

## 🚀 Cara Menjalankan (Docker Compose)

### Langkah 1: Clone Repository

```bash
git clone https://github.com/DanuAgPa/Homebyte.git
cd Homebyte
```

### Langkah 2: Jalankan Docker Compose

```bash
docker compose up -d --build
```

Perintah ini akan:
- Membangun (build) semua container dari kode sumber
- Menjalankan semua layanan di latar belakang (background)
- Menyiapkan reverse proxy (Traefik) secara otomatis

> ⏳ **Proses build pertama kali** memakan waktu sekitar **2–5 menit** tergantung kecepatan internet dan spesifikasi komputer.

### Langkah 3: Verifikasi

Pastikan semua container berjalan dengan perintah:

```bash
docker compose ps
```

Output yang diharapkan:

```
NAME                          STATUS
sisteminte-traefik-1          Up
sisteminte-nextjs-app-1       Up
sisteminte-crm-service-1      Up
sisteminte-hr-service-1       Up
sisteminte-minio-1            Up
```

### Langkah 4: Buka di Browser

Lihat bagian [Akses Layanan](#-akses-layanan) di bawah.

### Menghentikan Aplikasi

```bash
docker compose down
```

---

## 🌐 Akses Layanan

Setelah `docker compose up -d --build` berhasil, buka browser dan akses:

| Layanan | URL | Keterangan |
|---------|-----|------------|
| **Aplikasi Utama** | [http://localhost](http://localhost) | Website properti utama |
| **CRM Service** | [http://crm.localhost](http://crm.localhost) | Modul Customer Relationship Management |
| **HR Service** | [http://hr.localhost](http://hr.localhost) | Modul Human Resource |
| **MinIO Console** | [http://minio.localhost](http://minio.localhost) | Penyimpanan file (S3-compatible) |
| **Traefik Dashboard** | [http://localhost:8080](http://localhost:8080) | Monitoring reverse proxy |

> **⚠️ Penting:** Pastikan tidak ada aplikasi lain yang menggunakan **port 80** (misalnya Apache, Nginx, atau IIS). Jika ada, matikan terlebih dahulu.

---

## 👤 Akun & Login

Aplikasi menggunakan **Google OAuth** untuk autentikasi. Klik tombol **"Login dengan Google"** pada halaman login untuk masuk.

### Peran (Role)

| Role | Akses |
|------|-------|
| **USER** | Melihat properti, mengirim inquiry, menyimpan wishlist |
| **ADMIN** | Semua fitur USER + Dashboard Admin (kelola properti, pengguna, SCM, pesan masuk) |

> Admin dashboard dapat diakses di: [http://localhost/admin](http://localhost/admin)

---

## ✨ Fitur Utama

### 🏘️ Aplikasi Utama (Publik)
- Katalog properti dengan pencarian dan filter
- Detail properti lengkap (foto, harga, spesifikasi)
- Form **Hubungi Agen** untuk mengirim pertanyaan terkait properti
- Halaman **Hubungi Kami** (Contact)
- Wishlist / Simpan properti favorit
- Registrasi & Login (Google OAuth)

### 🛠️ Dashboard Admin
- **Dashboard Overview** — Statistik ringkasan (properti, pengguna, SCM, pesan masuk)
- **Kelola Properti** — Tambah, edit, hapus properti
- **Daftar Pengguna** — Lihat semua pengguna terdaftar
- **Pantau SCM** — Supply Chain Management (Supplier, Inventaris, Pengiriman)
- **Pesan Masuk** — Melihat semua pesan dari pengunjung (inquiry & notifikasi)

### 💼 CRM Service
- Manajemen leads dan pelanggan
- Upload file via MinIO

### 👥 HR Service
- Manajemen data karyawan
- Upload dokumen via MinIO

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
|----------|-----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4 |
| **Backend** | Next.js API Routes, Server Actions |
| **Database** | PostgreSQL (Neon - Cloud) |
| **ORM** | Prisma 7 |
| **Autentikasi** | NextAuth.js v5 (Google OAuth) |
| **Penyimpanan File** | MinIO (S3-compatible) |
| **Reverse Proxy** | Traefik v3 |
| **Containerization** | Docker & Docker Compose |
| **Microservices** | CRM Service, HR Service |

---

## 💻 Cara Menjalankan Tanpa Docker (Opsional)

Jika Anda ingin menjalankan **tanpa Docker** (misalnya untuk development), pastikan **Node.js v22+** dan **npm** sudah terinstal.

### 1. Install Dependencies

```bash
# Di root folder
npm install

# Di folder CRM
cd services/crm
npm install

# Di folder HR
cd ../hr
npm install
```

### 2. Setup Database

```bash
# Kembali ke root folder
cd ../..

# Generate Prisma Client
npx prisma generate

# Sinkronisasi skema ke database
npx prisma db push
```

### 3. Jalankan Aplikasi

Buka **3 terminal terpisah**:

**Terminal 1 — Aplikasi Utama (port 3000):**
```bash
npm run dev
```

**Terminal 2 — CRM Service (port 3001):**
```bash
cd services/crm
npm run dev
```

**Terminal 3 — HR Service (port 3002):**
```bash
cd services/hr
npm run dev
```

### Akses Tanpa Docker

| Layanan | URL |
|---------|-----|
| Aplikasi Utama | [http://localhost:3000](http://localhost:3000) |
| CRM Service | [http://localhost:3001](http://localhost:3001) |
| HR Service | [http://localhost:3002](http://localhost:3002) |

---

## 📝 Catatan Tambahan

- Database menggunakan **Neon (cloud PostgreSQL)**, sehingga tidak perlu menginstal PostgreSQL secara lokal.
- File `.env` sudah dikonfigurasi dengan koneksi database yang aktif.
- Jika ada error terkait koneksi database, pastikan komputer terhubung ke **internet**.

---

> **HomeByte** — Dibuat untuk memenuhi tugas mata kuliah Sistem Informasi Terintegrasi.
