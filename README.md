# Ruang Ekonomi

Website edukasi ekonomi berbahasa Indonesia, dengan enam materi awal ekonomi makro (pengantar, PDB, inflasi, pengangguran, fiskal, serta moneter dan kurs), kategori, pencarian, ilustrasi SVG, animasi ringan, dan tampilan untuk HP. Setiap materi berisi tujuan belajar, alur sebab-akibat, bedah contoh, ringkasan, serta kuis dengan umpan balik. Lab ekonomi mini menyediakan simulasi inflasi dari −2% sampai 15%. Tidak membutuhkan instalasi paket, database, atau kunci API.

## Menjalankan

Dari `/workspace/Pembelajaran`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Buka website melalui server HTTP di komputer atau layanan hosting yang digunakan. Hentikan server dengan Ctrl+C.

## Mengubah isi

- `app.js`: isi artikel ada dalam daftar `articles`. Setiap materi memiliki judul, kategori, bagian isi, tujuan, ringkasan, contoh, alur sebab-akibat, kuis, dan rujukan.
- `style.css`: warna, ukuran, dan tampilan.
- `index.html`: nama website, pengantar, dan bagian tentang.

Setelah mengubah materi atau rujukan di `app.js`, jalankan `python3 scripts/build-pages.py`. Periksa sinkronisasi dengan `python3 scripts/build-pages.py --check`. Halaman di `materi/`, halaman informasi, dan `sitemap.xml` dibuat dari generator ini.

Website menggunakan font bawaan. Semua fungsi utama berjalan tanpa layanan luar. Setiap artikel menyertakan rujukan lembaga resmi; angka yang digunakan merupakan ilustrasi.

## Penghasilan dan publikasi

Belum ada iklan, afiliasi, pelacakan, atau pembayaran aktif. Tempat iklan yang terlihat masih berlabel BELUM AKTIF. Baca [panduan monetisasi](MONETISASI.md) untuk langkah akun AdSense dan verifikasi domain. Kode diunggah ke branch main; status publikasi GitHub Pages harus diperiksa secara terpisah. Bangun konten orisinal dan pembaca terlebih dahulu. Jika menambahkan afiliasi, jelaskan hubungan komisi kepada pembaca. Persetujuan jaringan iklan dan penghasilan tidak dijamin.

Materi ini merupakan edukasi umum, bukan rekomendasi investasi pribadi. Tinjau ketepatan dan sumber materi sebelum memublikasikan.

## Aksesibilitas dan pemeriksaan

Animasi menghormati `prefers-reduced-motion`, dapat dijeda lewat tombol, berhenti sementara saat tab tersembunyi, dan materi tetap terlihat jika IntersectionObserver tidak tersedia. Navigasi mendukung keyboard, dialog dapat ditutup dengan Escape, dan pencarian serta simulasi memberi status kepada pembaca layar.

Periksa enam materi dan kuisnya, ketiga filter kategori, pencarian, navigasi antar-materi, tautan langsung, serta simulasi pada −2%, 0%, 5%, dan 15%. Periksa layar 360–1440 piksel dan preferensi gerakan berkurang. Tidak ada angka pasar langsung atau prediksi dalam ilustrasi dan simulator.

## Sumber dan interaksi

`sectionRefs`, `referenceGroups`, dan `referenceCatalog` pada `app.js` memetakan setiap penjelasan konsep, ringkasan, alur, dan soal ke penulis serta bagian buku. Angka contoh dan soal tetap milik Ruang Ekonomi, bukan diklaim sebagai kutipan tokoh. Lihat [catatan sumber](SOURCE-NOTES.md).

`animations.js` mengendalikan tombol jeda, putar ulang grafik, penghitung ilustrasi, serta gerak koin dan orbit. Preferensi gerakan minimal mematikan animasi. Kuis halaman mandiri ditangani `article-page.js`; fungsi utama membaca materinya tetap bekerja tanpa JavaScript. `citations.js` merender rujukan di ruang baca interaktif. Tidak ada pelacakan atau penyimpanan preferensi pengunjung.
