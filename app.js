const articles = [
  { id: 'inflasi', category: 'Ekonomi dasar', minutes: 4, title: 'Kenapa harga barang makin mahal? Kenalan dengan inflasi', description: 'Uang yang sama, belanja makin sedikit. Apa yang sebenarnya terjadi?', symbol: '↗', color: 'sage', caption: 'HARGA & DAYA BELI', sections: [
    ['Apa itu inflasi?', 'Inflasi adalah kenaikan harga barang dan jasa secara umum dalam suatu periode. Satu barang yang naik harga belum tentu berarti inflasi. Ukurannya melihat banyak kelompok pengeluaran, seperti makanan, transportasi, dan tempat tinggal.'],
    ['Mengapa harga bisa naik?', 'Harga bisa naik ketika permintaan lebih besar daripada pasokan, atau biaya produksi meningkat. Contohnya, biaya bahan bakar yang naik dapat membuat ongkos pengiriman lebih mahal. Gagal panen juga dapat mengurangi pasokan pangan.'],
    ['Contoh dekat dengan keseharian', 'Misalnya, keranjang belanja yang sama berharga Rp100.000 tahun lalu dan Rp105.000 tahun ini. Kenaikan keranjang itu adalah 5%. Ini contoh sederhana; inflasi resmi dihitung dari keranjang barang dan jasa yang lebih luas, bukan belanja satu orang.'],
    ['Apa yang bisa dilakukan?', 'Catat pengeluaran, bandingkan harga, dan periksa kembali anggaran secara berkala. Prioritaskan kebutuhan utama. Untuk memeriksa angka inflasi Indonesia, gunakan publikasi resmi Badan Pusat Statistik (BPS).']
  ]},
  { id: 'anggaran', category: 'Keuangan pribadi', minutes: 5, title: 'Gaji lewat begitu saja? Mulai dari anggaran sederhana', description: 'Bukan soal besar penghasilan, tapi mengenali ke mana uangmu pergi.', symbol: 'Rp', color: 'peach', caption: 'CATAT, ATUR, PAHAMI', sections: [
    ['Kenali arus uangmu', 'Mulai dari penghasilan bersih yang benar-benar diterima. Lalu catat pengeluaran selama satu bulan, termasuk biaya kecil seperti parkir, ongkir, dan langganan. Tujuannya memahami kebiasaan, bukan menyalahkan diri sendiri.'],
    ['Pisahkan kebutuhan dan keinginan', 'Kebutuhan seperti makan, tempat tinggal, dan transportasi perlu diprioritaskan. Keinginan tetap boleh ada, tetapi tentukan batas yang sesuai kemampuan. Pengeluaran yang sama bisa menjadi kebutuhan bagi satu orang dan keinginan bagi orang lain.'],
    ['Buat rencana yang realistis', 'Contohnya, dari penghasilan Rp3.000.000, kamu merencanakan Rp2.100.000 untuk kebutuhan, Rp300.000 untuk tabungan, dan Rp600.000 untuk pengeluaran lain. Angka ini hanya ilustrasi. Ubah sesuai biaya hidup, tanggungan, dan kewajibanmu.'],
    ['Evaluasi setiap bulan', 'Bandingkan rencana dengan pengeluaran sebenarnya. Jika ada selisih, cari penyebabnya dan sesuaikan. Anggaran yang bisa dijalankan lebih berguna daripada pembagian persentase yang terlihat ideal tetapi tidak cocok untukmu.']
  ]},
  { id: 'omzet', category: 'Usaha & bisnis', minutes: 4, title: 'Omzet besar belum tentu untung. Ini bedanya', description: 'Pahami omzet, biaya, dan laba sebelum mulai usaha pertamamu.', symbol: '− / +', color: 'yellow', caption: 'ANGKA DI BALIK USAHA', sections: [
    ['Omzet adalah total penjualan', 'Jika kamu menjual 100 porsi makanan seharga Rp20.000 per porsi, omzetmu Rp2.000.000. Ini pendapatan penjualan sebelum dikurangi biaya. Uang yang masuk belum seluruhnya menjadi keuntungan.'],
    ['Hitung seluruh biaya', 'Perhatikan bahan baku, kemasan, ongkir yang ditanggung usaha, sewa, listrik, upah, dan biaya platform. Peralatan yang digunakan jangka panjang juga memiliki biaya penggunaan atau penyusutan. Jangan lupa menghargai waktu kerjamu sendiri.'],
    ['Dari omzet menjadi laba', 'Dalam contoh sederhana, jika omzet Rp2.000.000 dan total biaya periode itu Rp1.600.000, laba adalah Rp400.000 sebelum pajak dan penyesuaian lain. Margin laba contoh ini adalah Rp400.000 dibagi Rp2.000.000, yaitu 20%.'],
    ['Pisahkan uang usaha', 'Catat transaksi secara rutin dan pisahkan uang usaha dari uang pribadi. Perhatikan juga arus kas: penjualan yang belum dibayar pelanggan tidak selalu menyediakan uang tunai untuk membeli bahan besok.']
  ]},
  { id: 'dana-darurat', category: 'Keuangan pribadi', minutes: 4, title: 'Dana darurat: bantalan kecil saat hidup memberi kejutan', description: 'Persiapkan pengeluaran tak terduga, sedikit demi sedikit.', symbol: '☂', color: 'blue', caption: 'SIAP UNTUK TAK TERDUGA', sections: [
    ['Kenapa perlu dana darurat?', 'Penghasilan dapat terhenti dan kebutuhan mendesak bisa muncul. Dana darurat membantu menutup pengeluaran penting tanpa langsung mengambil utang baru atau menjual aset saat kondisinya kurang menguntungkan.'],
    ['Tentukan target sesuai kondisi', 'Kebutuhan beberapa bulan pengeluaran pokok sering digunakan sebagai acuan awal. Target tiap orang berbeda, tergantung kestabilan penghasilan, jumlah tanggungan, asuransi, dan dukungan yang tersedia. Mulai dari target kecil yang dapat dicapai.'],
    ['Simpan agar mudah diakses', 'Utamakan kemudahan pencairan dan risiko yang rendah. Pisahkan dari rekening belanja harian jika membantu disiplin. Pahami biaya, ketentuan penarikan, dan perlindungan produk sebelum memilih tempat penyimpanan.'],
    ['Bangun secara bertahap', 'Sisihkan nominal yang realistis secara rutin. Jika dana terpakai untuk keadaan darurat, susun kembali rencana pengisiannya. Dana ini berfungsi sebagai perlindungan kebutuhan, bukan untuk mengejar keuntungan tinggi.']
  ]},
  { id: 'permintaan', category: 'Ekonomi dasar', minutes: 3, title: 'Permintaan dan penawaran, lewat cerita secangkir kopi', description: 'Dua kekuatan sederhana yang membantu menjelaskan perubahan harga.', symbol: '⇄', color: 'lilac', caption: 'CARA PASAR BEKERJA', sections: [
    ['Dari sebuah kedai kopi', 'Bayangkan sebuah kedai menjual es kopi. Saat cuaca panas dan banyak orang ingin membeli, permintaan bisa meningkat. Jika jumlah minuman yang bisa dibuat tetap terbatas, kedai mungkin menghadapi antrean atau tekanan untuk menaikkan harga.'],
    ['Apa itu penawaran?', 'Penawaran adalah jumlah barang atau jasa yang bersedia dan mampu dijual pada berbagai tingkat harga dalam periode tertentu. Ketika biaya biji kopi naik, kedai mungkin mengurangi produksi pada harga yang sama atau menaikkan harga jual.'],
    ['Harga tidak bergerak sendirian', 'Dalam model sederhana, pertemuan permintaan dan penawaran membantu menjelaskan harga pasar. Dunia nyata juga dipengaruhi persaingan, aturan pemerintah, kontrak, kualitas produk, dan waktu yang diperlukan untuk menambah produksi.'],
    ['Latihan kecil', 'Perhatikan harga buah saat musim panen. Saat pasokan bertambah, harga bisa turun jika faktor lain tetap. Lalu pikirkan faktor lain yang mungkin berpengaruh, seperti cuaca, biaya distribusi, dan perubahan jumlah pembeli.']
  ]},
  { id: 'modal', category: 'Usaha & bisnis', minutes: 5, title: 'Mulai usaha kecil: hitung modal sebelum melangkah', description: 'Uji idemu dengan skala kecil dan perhitungan yang masuk akal.', symbol: '✳', color: 'mint', caption: 'DARI IDE JADI LANGKAH', sections: [
    ['Mulai dari masalah pelanggan', 'Tentukan siapa calon pembelimu dan masalah apa yang ingin kamu bantu selesaikan. Tanyakan kebutuhan mereka dan uji produk sederhana sebelum membeli banyak peralatan atau stok. Minat belum tentu berubah menjadi pembelian.'],
    ['Pisahkan modal awal dan biaya rutin', 'Modal awal dapat mencakup alat dan persiapan tempat. Biaya rutin dapat meliputi bahan, sewa, listrik, kemasan, dan promosi. Sediakan ruang untuk pengeluaran tak terduga dan waktu sampai pembayaran pelanggan diterima.'],
    ['Coba hitung titik impas', 'Misalnya biaya tetap per bulan Rp500.000, harga jual Rp15.000, dan biaya variabel Rp10.000 per produk. Selisih Rp5.000 per produk membantu menutup biaya tetap. Dengan asumsi sederhana ini, kamu perlu menjual 100 produk untuk impas, sebelum pajak dan biaya lain yang belum dihitung.'],
    ['Uji, catat, perbaiki', 'Mulai dengan jumlah yang risikonya mampu kamu tanggung. Catat penjualan dan masukan pembeli. Hindari menganggap omzet percobaan sebagai jaminan penjualan di masa depan. Periksa juga izin dan aturan yang berlaku untuk jenis usahamu.']
  ]}
];
let category = 'Semua';
const grid = document.querySelector('#article-grid');
const search = document.querySelector('#search');
const reader = document.querySelector('#reader');
function render() {
  const query = search.value.trim().toLocaleLowerCase('id');
  const filtered = articles.filter(a => (category === 'Semua' || a.category === category) && `${a.title} ${a.description} ${a.category} ${a.sections.flat().join(' ')}`.toLocaleLowerCase('id').includes(query));
  grid.innerHTML = filtered.map(a => `<article class="card"><div class="card-art ${a.color}" aria-hidden="true"><span class="art-number">0${articles.indexOf(a) + 1}</span><span class="symbol">${a.symbol}</span><span class="art-caption">${a.caption}</span></div><div class="card-meta"><span class="category">${a.category}</span><span>· ${a.minutes} menit baca</span></div><h3>${a.title}</h3><p>${a.description}</p><button class="read-link" data-id="${a.id}" aria-label="Baca artikel: ${a.title}">Baca artikel <span aria-hidden="true">↗</span></button></article>`).join('');
  document.querySelector('#empty').hidden = filtered.length > 0;
  document.querySelector('#results').textContent = `${filtered.length} artikel ditemukan`;
}
document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  document.querySelectorAll('[data-category]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  render();
}));
search.addEventListener('input', render);
grid.addEventListener('click', event => { const button = event.target.closest('[data-id]'); if (button) location.hash = `baca-${button.dataset.id}`; });
function syncReader() {
  const article = articles.find(a => `#baca-${a.id}` === location.hash);
  if (!article) { if (reader.open) reader.close(); return; }
  document.querySelector('#reader-content').innerHTML = `<p class="eyebrow">${article.category} · ${article.minutes} menit baca</p><h2 id="reader-title">${article.title}</h2>${article.sections.map(([title, body]) => `<h3>${title}</h3><p>${body}</p>`).join('')}`;
  reader.setAttribute('aria-labelledby', 'reader-title');
  if (!reader.open) reader.showModal();
  reader.scrollTop = 0;
}
function closeReader() { history.replaceState(null, '', `${location.pathname}${location.search}#artikel`); reader.close(); }
document.querySelector('#close-reader').addEventListener('click', closeReader);
reader.addEventListener('cancel', event => { event.preventDefault(); closeReader(); });
window.addEventListener('hashchange', syncReader);
document.querySelector('#year').textContent = new Date().getFullYear();
render(); syncReader();
