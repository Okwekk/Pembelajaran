# Ruang Ekonomi

Website edukasi ekonomi berbahasa Indonesia, dengan enam materi awal ekonomi makro (pengantar, PDB, inflasi, pengangguran, fiskal, serta moneter dan kurs), kategori, pencarian, dan tampilan untuk HP. Tidak membutuhkan instalasi paket, database, atau kunci API.

## Menjalankan

Dari `/workspace/Pembelajaran`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Buka website melalui server HTTP di komputer atau layanan hosting yang digunakan. Hentikan server dengan Ctrl+C.

## Mengubah isi

- `app.js`: isi artikel ada dalam daftar `articles`. Setiap artikel memiliki judul, kategori, ringkasan, dan bagian isi.
- `style.css`: warna, ukuran, dan tampilan.
- `index.html`: nama website, pengantar, dan bagian tentang.

Website menggunakan font bawaan. Semua fungsi utama berjalan tanpa layanan luar. Setiap artikel menyertakan rujukan lembaga resmi; angka yang digunakan merupakan ilustrasi.

## Penghasilan dan publikasi

Belum ada iklan, afiliasi, pelacakan, atau pembayaran yang terpasang. Kode diunggah ke branch main; status publikasi GitHub Pages harus diperiksa secara terpisah. Bangun konten orisinal dan pembaca terlebih dahulu. Jika menambahkan afiliasi, jelaskan hubungan komisi kepada pembaca. Persetujuan jaringan iklan dan penghasilan tidak dijamin.

Materi ini merupakan edukasi umum, bukan rekomendasi investasi pribadi. Tinjau ketepatan dan sumber materi sebelum memublikasikan.
