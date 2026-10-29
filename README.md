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

Website menggunakan font bawaan. Semua fungsi utama berjalan tanpa layanan luar. Setiap artikel menyertakan rujukan lembaga resmi; angka yang digunakan merupakan ilustrasi.

## Penghasilan dan publikasi

Belum ada iklan, afiliasi, pelacakan, atau pembayaran yang terpasang. Kode diunggah ke branch main; status publikasi GitHub Pages harus diperiksa secara terpisah. Bangun konten orisinal dan pembaca terlebih dahulu. Jika menambahkan afiliasi, jelaskan hubungan komisi kepada pembaca. Persetujuan jaringan iklan dan penghasilan tidak dijamin.

Materi ini merupakan edukasi umum, bukan rekomendasi investasi pribadi. Tinjau ketepatan dan sumber materi sebelum memublikasikan.

## Aksesibilitas dan pemeriksaan

Animasi menghormati `prefers-reduced-motion`, gerakan dekoratif berhenti sendiri, dan materi tetap terlihat jika IntersectionObserver tidak tersedia. Navigasi mendukung keyboard, dialog dapat ditutup dengan Escape, dan pencarian serta simulasi memberi status kepada pembaca layar.

Periksa enam materi dan kuisnya, ketiga filter kategori, pencarian, navigasi antar-materi, tautan langsung, serta simulasi pada −2%, 0%, 5%, dan 15%. Periksa layar 360–1440 piksel dan preferensi gerakan berkurang. Tidak ada angka pasar langsung atau prediksi dalam ilustrasi dan simulator.
