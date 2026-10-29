#!/usr/bin/env python3
"""Generate crawlable pages from the same lesson data used by the reading room."""
from pathlib import Path
from html import escape
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://okwekk.github.io/Pembelajaran/'
source = (ROOT / 'app.js').read_text()
decoder = json.JSONDecoder()
articles = decoder.raw_decode(source.split('const articles = ', 1)[1])[0]
refs = decoder.raw_decode(source.split('const referenceCatalog = ', 1)[1])[0]
e = lambda text: escape(str(text), quote=True)

def citations(ids, label='Rujukan konsep'):
    if not ids:
        return '<small class="citation editorial">Catatan Ruang Ekonomi — bukan kutipan tokoh.</small>'
    links = []
    for key in ids:
        ref = refs[key]
        links.append(f'<a href="{e(ref["url"])}" target="_blank" rel="noopener noreferrer" title="{e(ref["label"])}">{e(ref["shortAuthor"])}, §{key}</a>')
    return f'<small class="citation">{e(label)}: {" · ".join(links)}</small>'

def bibliography(article):
    items = ''.join(f'<li><a href="{e(refs[key]["url"])}" target="_blank" rel="noopener noreferrer">{e(refs[key]["label"])}</a> <a class="source-text-link" href="{e(refs[key]["textUrl"])}" target="_blank" rel="noopener noreferrer">Naskah penerbit</a></li>' for key in article['referenceIds'])
    local = ''.join(f'<li><a href="{e(url)}" target="_blank" rel="noopener noreferrer">{e(label)}</a></li>' for label, url in article['sources'])
    return f'<p class="reference-authors"><strong>Steven A. Greenlaw, David Shapiro &amp; Daniel MacDonald.</strong><br><em>Principles of Macroeconomics 3e</em>, OpenStax.</p><ol class="reference-list">{items}</ol><h4>Konteks Indonesia</h4><ul>{local}</ul>'

AD = '<aside class="ad-placeholder" aria-label="Ruang iklan yang belum aktif"><div><span class="ad-label">IKLAN</span><span class="ad-state">BELUM AKTIF</span></div><p>Ruang sponsor untuk mendukung materi gratis.</p><small>Belum ada iklan yang ditayangkan.</small></aside>'

def page(title, description, content, filename, article=False):
    parent = '../' if article else ''
    canonical = BASE + filename
    links = ''.join(f'<a href="{parent}{path}.html">{label}</a>' for path, label in [('tentang','Tentang'),('sumber','Sumber & editorial'),('privasi','Privasi'),('kontak','Kontak')])
    return f'''<!doctype html>
<html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="{e(description)}"><meta name="theme-color" content="#163d32"><title>{e(title)} — Ruang Ekonomi</title><link rel="canonical" href="{canonical}"><link rel="icon" href="{parent}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="{parent}style.css?v=3"></head>
<body><a class="skip-link" href="#isi">Langsung ke isi</a><header class="site-header wrap"><a class="brand" href="{parent}index.html"><span>ruang<strong>ekonomi.</strong></span></a><nav aria-label="Navigasi utama"><a href="{parent}index.html#artikel">Materi</a><a href="{parent}index.html#laboratorium">Lab ekonomi</a></nav></header>
<main class="document-main" id="isi"><nav class="breadcrumbs" aria-label="Jejak navigasi"><a href="{parent}index.html">Beranda</a><span aria-hidden="true">/</span><span>{e('Materi ekonomi makro' if article else title)}</span></nav><article class="article-document">{content}</article></main>
<footer class="site-footer"><div class="wrap"><div class="footer-top"><a class="brand" href="{parent}index.html"><span>ruang<strong>ekonomi.</strong></span></a><a class="back-link" href="{parent}index.html#artikel">Kembali ke materi ↑</a></div><div class="footer-links">{links}</div><div class="footer-bottom"><span>Ruang Ekonomi</span><p>Materi edukasi umum. Angka ilustrasi bukan data terkini atau saran investasi pribadi.</p></div></div></footer>
<script src="{parent}article-page.js?v=3"></script></body></html>
'''

outputs = {}
for index, article in enumerate(articles):
    if len(article['sectionRefs']) != len(article['sections']):
        raise ValueError('Missing section references: ' + article['id'])
    for key in article['referenceIds']:
        if key not in refs:
            raise ValueError('Unknown source ' + key)
    content = f'<p class="eyebrow">MATERI 0{index + 1} / {e(article["category"])} / {article["minutes"]} MENIT + LATIHAN</p><h1>{e(article["title"])}</h1><p class="lesson-deck">{e(article["description"])}</p><p class="attribution-note">Penjelasan orisinal Ruang Ekonomi. Dasar konsep: <strong>Steven A. Greenlaw, David Shapiro &amp; Daniel MacDonald</strong>, <em>Principles of Macroeconomics 3e</em>. Ini parafrasa konsep, bukan kutipan langsung atau ulasan yang disahkan penulis.</p><div class="lesson-goal"><span>SETELAH MEMBACA, KAMU BISA…</span><p>{e(article["goal"])}</p></div>'
    for i, (title, body) in enumerate(article['sections']):
        content += f'<section class="lesson-section"><h2><span>0{i + 1} / </span>{e(title)}</h2><p>{e(body)}</p>{citations(article["sectionRefs"][i])}</section>'
    content += '<div class="cause-chain" aria-label="Contoh alur sebab-akibat">' + '<span aria-hidden="true">→</span>'.join(f'<div class="cause-step"><small>0{i + 1}</small><strong>{e(step)}</strong></div>' for i, step in enumerate(article['chain'])) + '</div>'
    groups = article['referenceGroups']
    content += f'<p class="chain-note">{e(article["chainNote"])}</p>{citations(groups["chain"])}'
    content += f'<aside class="example-box"><span>BEDAH CONTOH / ANGKA ILUSTRASI</span><h2>{e(article["example"]["title"])}</h2><p>{e(article["example"]["body"])}</p><small class="example-origin">Hitungan dan angka ilustrasi: Ruang Ekonomi.</small>{citations(groups["example"], "Dasar konsep hitungan")}</aside>'
    content += '<aside class="lesson-summary"><span>TIGA HAL UNTUK DIBAWA PULANG</span><ul>' + ''.join(f'<li>{e(text)}{citations(groups["takeaways"][i])}</li>' for i,text in enumerate(article['takeaways'])) + '</ul></aside>'
    quiz = article['quiz']
    content += f'<section class="quiz" aria-labelledby="quiz-question"><p class="eyebrow">CEK PEMAHAMAN</p><h2 id="quiz-question">{e(quiz["question"])}</h2><div class="quiz-options" role="group" aria-labelledby="quiz-question">'
    for i, option in enumerate(quiz['options']):
        content += f'<button type="button" data-answer="{i}" data-correct="{str(i == quiz["answer"]).lower()}" data-feedback="{e(quiz["feedback"][i])}" aria-pressed="false"><span aria-hidden="true">{chr(65 + i)}</span>{e(option)}</button>'
    content += f'</div>{citations(groups["quiz"], "Dasar penyusunan soal")}<p id="quiz-feedback" class="quiz-feedback" role="status" aria-live="polite" aria-atomic="true" hidden></p><noscript><p>Aktifkan JavaScript untuk memeriksa jawaban kuis.</p></noscript></section>'
    content += f'<section class="lesson-sources"><h2>Sumber &amp; penulis rujukan</h2>{bibliography(article)}<p class="source-note">Rujukan mendukung konsep, bukan menyatakan penulis menggunakan angka contoh ini. <a href="../sumber.html">Cara kami menggunakan sumber.</a></p></section><nav class="lesson-nav" aria-label="Urutan materi">'
    if index:
        previous = articles[index - 1]
        content += f'<a href="{previous["id"]}.html"><span>← MATERI SEBELUMNYA</span>{e(previous["title"].split(":")[0])}</a>'
    else:
        content += '<a href="../index.html#artikel"><span>← PETA BELAJAR</span>Semua materi</a>'
    if index < len(articles) - 1:
        following = articles[index + 1]
        content += f'<a href="{following["id"]}.html"><span>MATERI BERIKUTNYA →</span>{e(following["title"].split(":")[0])}</a>'
    else:
        content += '<a href="../index.html#laboratorium"><span>SELESAI? COBA PRAKTIK →</span>Lab ekonomi mini</a>'
    content += '</nav>' + AD
    filename = f'materi/{article["id"]}.html'
    outputs[filename] = page(article['title'], article['description'], content, filename, True)

info = {
 'tentang': ('Tentang Ruang Ekonomi', 'Kenali tujuan dan batas materi Ruang Ekonomi.', '''<p class="eyebrow">KENALAN DULU</p><h1>Ekonomi untuk rasa ingin tahu.</h1><div class="document-copy"><p>Ruang Ekonomi adalah situs edukasi ekonomi makro berbahasa Indonesia untuk pemula. Materi awal membahas produksi, harga, pekerjaan, kebijakan fiskal, suku bunga, dan kurs.</p><h2>Cara kami mengajar</h2><p>Penjelasan ditulis dengan bahasa sehari-hari, dilengkapi alur sebab-akibat, contoh hitungan, ringkasan, dan latihan. Tulisan serta ilustrasi disusun untuk situs ini; rujukan konsep dapat ditelusuri di setiap bagian.</p><h2>Batas materi</h2><p>Konten untuk pendidikan umum, bukan rekomendasi investasi, nasihat keuangan pribadi, atau laporan data terkini. Model ekonomi menyederhanakan kenyataan. Contoh angka tidak boleh dibaca sebagai ramalan.</p><h2>Iklan dan kemandirian</h2><p>Belum ada iklan berbayar atau tautan afiliasi aktif. Ruang iklan yang terlihat hanya tempat yang disiapkan, bukan iklan yang menghasilkan pendapatan. Jika kerja sama diaktifkan kelak, penempatannya akan diberi label.</p><p><a href="sumber.html">Cara menggunakan sumber</a> · <a href="kontak.html">Sampaikan koreksi</a></p></div>'''),
 'sumber': ('Sumber & kebijakan editorial', 'Penulis rujukan, cakupan sitasi, dan perbedaan parafrasa dengan kutipan.', '''<p class="eyebrow">SUMBER YANG BISA DITELUSURI</p><h1>Penjelasan jelas.<br>Rujukan juga jelas.</h1><div class="document-copy"><h2>Penulis rujukan utama</h2><p>Steven A. Greenlaw, David Shapiro, dan Daniel MacDonald adalah penulis kontributor utama <em>Principles of Macroeconomics 3e</em>, diterbitkan OpenStax. Nama mereka dapat dilihat pada <a href="https://openstax.org/books/principles-macroeconomics-3e/pages/preface" target="_blank" rel="noopener noreferrer">prakata buku</a>. Mereka dirujuk sebagai penulis buku ajar, bukan dianggap penemu tunggal seluruh konsep.</p><h2>Sitasi di dekat penjelasan</h2><p>Tautan di setiap bagian menunjukkan bagian buku yang membahas konsep tersebut. Daftar sumber pada akhir materi juga memuat naskah dari repositori resmi penerbit, sehingga rujukan dapat ditelusuri sampai judul dan isi bagian.</p><h2>Parafrasa, bukan kutipan langsung</h2><p>Penjelasan ditulis sendiri oleh Ruang Ekonomi. Nama ahli tidak berarti mereka menulis, meninjau, atau mendukung situs ini. Pembahasan John Maynard Keynes dirujuk melalui uraian sekunder buku tersebut, khususnya §12.1, bukan dihadirkan sebagai kutipan karya asli Keynes.</p><h2>Contoh dan soal</h2><p>Angka, soal, dan simulasi adalah ilustrasi yang kami susun sendiri. Rujukan pada kotak contoh menjelaskan dasar konsep atau rumusnya; angka contoh tidak diklaim berasal dari penelitian atau ucapan tokoh.</p><h2>Konteks Indonesia</h2><p>Tautan BPS, Bank Indonesia, dan Kementerian Keuangan disediakan sebagai tempat menelusuri data, definisi operasional, dan kebijakan Indonesia. Buku rujukan banyak memakai konteks Amerika Serikat; definisi statistik atau aturan setempat dapat berbeda.</p><h2>Koreksi dan pembaruan</h2><p>Jika menemukan kesalahan hitungan, atribusi, atau tautan, <a href="kontak.html">hubungi pengelola</a> dengan menyertakan judul materi, bagian yang perlu dikoreksi, dan rujukan pembanding.</p></div>'''),
 'privasi': ('Kebijakan privasi', 'Bagaimana data dan layanan pihak ketiga digunakan di Ruang Ekonomi.', '''<p class="eyebrow">PRIVASI PEMBACA</p><h1>Belajar tanpa formulir data pribadi.</h1><div class="document-copy"><p>Kebijakan ini menjelaskan versi situs yang tersedia saat ini.</p><h2>Data di situs ini</h2><p>Ruang Ekonomi tidak menyediakan akun pengguna, formulir pendaftaran, atau pembayaran. Pencarian, kuis, pilihan animasi, dan simulasi diproses di browser dan tidak dikirim oleh kode situs ke server pengelola. Pilihan animasi tidak disimpan setelah halaman dimuat ulang.</p><h2>Analitik dan iklan</h2><p>Saat ini kode situs tidak memasang layanan analitik, skrip AdSense, cookie iklan, atau tautan afiliasi. Ruang sponsor hanya penanda tempat dan tidak memuat iklan dari jaringan eksternal. Jika layanan tersebut dipasang kelak, kebijakan ini perlu diperbarui untuk menjelaskan penyedia, penggunaan data, serta pilihan persetujuan yang diperlukan.</p><h2>Layanan hosting</h2><p>Situs dihosting melalui GitHub Pages. GitHub dapat memproses data teknis permintaan, seperti alamat IP, sesuai <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">kebijakan privasi GitHub</a>. Ini terpisah dari pemrosesan kuis dan simulasi di browser.</p><h2>Tautan ke situs lain</h2><p>Tautan buku, rujukan resmi, dan kanal kontak membuka layanan lain. Ketika mengunjunginya, kebijakan layanan tersebut berlaku. Membaca sumber tidak memerlukan pengiriman jawaban kuis.</p><h2>Pertanyaan privasi</h2><p>Gunakan <a href="kontak.html">kanal kontak pengelola</a>. Jangan mengirim data sensitif melalui issue publik GitHub.</p></div>'''),
 'kontak': ('Kontak & koreksi', 'Kanal pengelola untuk masukan materi, koreksi sumber, dan pertanyaan kerja sama.', '''<p class="eyebrow">BANTU KAMI MEMBUATNYA LEBIH BAIK</p><h1>Ada yang perlu dikoreksi?</h1><div class="document-copy"><p>Pengelola situs dapat dihubungi melalui repositori GitHub <a href="https://github.com/Okwekk/Pembelajaran" target="_blank" rel="noopener noreferrer">Okwekk/Pembelajaran</a>.</p><h2>Koreksi materi atau sumber</h2><p><a href="https://github.com/Okwekk/Pembelajaran/issues/new" target="_blank" rel="noopener noreferrer">Buat issue di repositori</a> dan sertakan judul materi, kalimat atau perhitungan yang perlu diperiksa, serta rujukan pembanding jika ada. GitHub mungkin meminta kamu masuk ke akun terlebih dahulu.</p><h2>Kerja sama</h2><p>Untuk pertanyaan umum mengenai dukungan atau kerja sama, buka issue dengan judul yang jelas atau lihat <a href="https://github.com/Okwekk" target="_blank" rel="noopener noreferrer">profil pengelola</a>. Kanal ini bersifat publik; jangan menyertakan data pembayaran atau dokumen identitas.</p><h2>Status iklan</h2><p>Belum ada iklan berbayar atau kerja sama sponsor yang aktif. Ruang iklan pada situs adalah persiapan penempatan, bukan bukti adanya pengiklan atau penghasilan.</p></div>''')
}
for slug, (title, description, body) in info.items():
    filename = slug + '.html'
    outputs[filename] = page(title, description, body, filename)

ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
namespace = '{http://www.sitemaps.org/schemas/sitemap/0.9}'
sitemap = ET.Element(namespace + 'urlset')
for filename in ['', *outputs.keys()]:
    url = ET.SubElement(sitemap, namespace + 'url')
    ET.SubElement(url, namespace + 'loc').text = BASE + filename
outputs['sitemap.xml'] = ET.tostring(sitemap, encoding='unicode', xml_declaration=True) + '\n'

check = '--check' in sys.argv
stale = []
for filename, html in outputs.items():
    path = ROOT / filename
    if check:
        if not path.exists() or path.read_text() != html:
            stale.append(filename)
    else:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(html)
if stale:
    raise SystemExit('Generated pages are stale: ' + ', '.join(stale))
print(f'{"PASS: checked" if check else "Generated"} {len(outputs)} files from the shared lesson data.')
