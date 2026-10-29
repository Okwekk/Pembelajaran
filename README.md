# Ruang Ekonomi

Website edukasi ekonomi berbahasa Indonesia, dengan enam artikel awal, kategori, pencarian, dan tampilan untuk HP. Tidak membutuhkan instalasi paket, database, atau kunci API.

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

Font Google bersifat opsional; website menggunakan font bawaan jika font tersebut tidak tersedia. Semua fungsi utama berjalan tanpa layanan luar.

## Penghasilan dan publikasi

Belum ada iklan, afiliasi, pelacakan, atau pembayaran yang terpasang. Website belum dipublikasikan. Bangun konten orisinal dan pembaca terlebih dahulu. Jika menambahkan afiliasi, jelaskan hubungan komisi kepada pembaca. Persetujuan jaringan iklan dan penghasilan tidak dijamin.

Materi ini merupakan edukasi umum, bukan rekomendasi investasi pribadi. Tinjau ketepatan dan sumber materi sebelum memublikasikan.
