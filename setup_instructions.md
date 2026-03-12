# Panduan Integrasi Google Sheets - Buku Tamu PST BPS Kab. Buol

Untuk menyimpan data dari web Buku Tamu langsung ke Google Spreadsheet, Anda perlu mengikuti langkah-langkah di bawah ini:

## Langkah 1: Buat Google Sheet
1. Buka [Google Sheets](https://sheets.google.com) dan buat *Spreadsheet* baru.
2. Beri nama spreadsheet tersebut, misalnya: **Data Buku Tamu PST**.
3. Pada baris pertama (Row 1), buat *header* berikut untuk tiap kolom secara berurutan:
   - Kolom A: `Timestamp`
   - Kolom B: `Nama`
   - Kolom C: `Instansi`
   - Kolom D: `Kontak`
   - Kolom E: `Email`
   - Kolom F: `Tujuan`
   - Kolom G: `Rincian`

> **Note**: Nama header di atas bersifat *pilihan eksklusif*, namun disarankan mengikuti struktur tersebut untuk kerapian. Script di bawah ini akan secara otomatis menambahkan data di baris kosong berikutnya.

## Langkah 2: Tambahkan Google Apps Script
1. Pada spreadsheet yang sudah dibuat, klik menu **Ekstensi** > **Apps Script** (atau *Extensions > Apps Script*).
2. Hapus semua kode default yang ada di dalam editor.
3. *Copy* (salin) kode di bawah ini, lalu *Paste* (tempel) ke dalam editor Apps Script:

```javascript
const SHEET_NAME = 'Sheet1'; // Pastikan nama sheet sesuai dengan yang ada di spreadsheet (biasanya 'Sheet1' atau 'Sheet 1')

function doPost(e) {
  try {
    // Membuka spreadsheet aktif
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);
    
    // Mendapatkan data dari form
    const data = e.parameter;
    
    // Timestamp saat ini
    const timestamp = new Date();
    
    // Menyiapkan baris data yang akan dimasukkan ke spreadsheet
    // Urutan kolom: Timestamp, Nama, Instansi, Kontak, Email, Tujuan, Rincian
    const rowData = [
      timestamp,
      data.Nama || "",
      data.Instansi || "",
      data.Kontak || "",
      data.Email || "",
      data.Tujuan || "",
      data.Rincian || ""
    ];
    
    // Menyisipkan data di baris terakhir yang kosong
    sheet.appendRow(rowData);
    
    // Mengembalikan response sukses ke frontend
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Mengembalikan response error
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Ubah `const SHEET_NAME = 'Sheet1';` jika nama *sheet* Anda berbeda (misal: "BukuTamu").
5. Klik icon disket (💾) atau tekan `Ctrl + S / Cmd + S` untuk menyimpan script. Beri nama project (misal: "BukuTamu-Backend").

## Langkah 3: Deploy sebagai Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Terapkan** (Deploy) > **Deployment baru** (New deployment).
2. Klik icon roda gigi (⚙️) di samping "Pilih jenis", lalu centang **Aplikasi Web** (Web app).
3. Isi deskripsi form:
   - **Deskripsi**: "Backend Buku Tamu v1"
   - **Jalankan sebagai**: Pilih "Saya" (Me - akun email Anda).
   - **Siapa yang memiliki akses**: Pilih "**Siapa saja**" (Anyone). *Penting! Jika tidak diatur 'Siapa saja', web tidak akan bisa men-submit data.*
4. Klik tombol **Terapkan** (Deploy).
5. Akan muncul prompt **Otorisasi akses** (Authorize access):
   - Klik "Otorisasi akses".
   - Pilih akun Google Anda.
   - Jika muncul peringatan keamanan "Google hasn’t verified this app", klik "Lanjutan" (Advanced) > "Buka [Nama Project] (tidak aman)" -> *Go to [Project Name] (unsafe)*.
   - Klik "Izinkan" (Allow).
6. Setelah selesai, Anda akan melihat **URL Aplikasi Web** (Web app URL). **Salin (Copy) URL ini**.

## Langkah 4: Hubungkan Web App URL ke kode HTML/JS
1. Buka file `script.js` pada project web (`d:\projects\bukutamu-new\script.js`).
2. Cari baris berikut (di sekitar baris 10):
   `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
3. Ganti `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'` dengan URL yang baru saja Anda salin dari langkah ketiga. Pastikan url tetap berada di dalam tanda kutip tunggal (`'...'`).
4. Simpan file `script.js`.

**Selesai!** Anda kini dapat membuka file `index.html` di browser Anda dan mencoba mengirimkan satu buah data *dummy* untuk melihat apakah data tersebut langsung masuk ke Google Sheet Anda!
