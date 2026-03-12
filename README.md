# Buku Tamu Pelayanan Statistik Terpadu (PST) - BPS Kabupaten Buol

Aplikasi web *Single Page Application* (SPA) sederhana untuk mencatat kunjungan dan layanan tamu di Pelayanan Statistik Terpadu BPS Kabupaten Buol.

## Fitur Utama

- **Desain Modern:** Menggunakan tampilan *Glassmorphism* yang elegan dan responsif untuk mobile.
- **Formulir Buku Tamu Terintegrasi:** Langsung tersambung ke **Google Sheets** menggunakan Google Apps Script, sehingga tidak memerlukan database yang kompleks.
- **Integrasi Layanan Terpadu:**
  - Tautan langsung ke [LAPOR!](https://www.lapor.go.id/) (Layanan Aspirasi dan Pengaduan Online Rakyat).
  - Tautan media sosial resmi (WhatsApp, Instagram, Facebook, dan Website Resmi BPS Kabupaten Buol).
- **Setup CI/CD Otomatis:** Dilengkapi dengan Workflow GitHub Actions yang otomatis me-*deploy* aplikasi ke GitHub Pages setiap ada `push` ke branch `main`.

## Cara Kerja (Frontend)

Aplikasi dibangun murni menggunakan Vanilla HTML, CSS, dan JavaScript agar sangat ringan dan cepat.

- `index.html`: Struktur dasar halaman dan komponen.
- `style.css`: Semua aturan tata letak, warna, dan animasi UI.
- `script.js`: Logika aplikasi, transisi antar halaman, dan *fetch API* pengiriman data form ke Google Apps Script Web App.

## Panduan Instalasi (Backend / Database)

Aplikasi ini menggunakan Google Sheets sebagai database. Untuk menghubungkan frontend dengan Google Sheet Anda, ikuti panduan lengkap di file berikut:

👉 [**Panduan Setup Google Apps Script**](setup_instructions.md)

## Pengembang

Dikembangkan untuk **Badan Pusat Statistik Kabupaten Buol**.
&copy; 2024 (Auto-updated) Badan Pusat Statistik Kabupaten Buol
