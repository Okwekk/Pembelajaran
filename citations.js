/* References support concepts, not authorship of our illustrative calculations. */
const Citations = {
  escape(text) {
    return String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  },
  inline(ids, label = 'Rujukan konsep') {
    if (!ids?.length) return '<small class="citation editorial">Catatan Ruang Ekonomi — bukan kutipan tokoh.</small>';
    return `<small class="citation">${label}: ${ids.map(id => {
      const ref = referenceCatalog[id];
      return `<a href="${ref.url}" target="_blank" rel="noopener noreferrer" title="${Citations.escape(ref.label)}">${Citations.escape(ref.shortAuthor)}, §${id}</a>`;
    }).join(' · ')}</small>`;
  },
  bibliography(article) {
    return `<p class="reference-authors"><strong>Steven A. Greenlaw, David Shapiro & Daniel MacDonald.</strong><br><em>Principles of Macroeconomics 3e</em>, OpenStax.</p><ol class="reference-list">${article.referenceIds.map(id => { const ref = referenceCatalog[id]; return `<li><a href="${ref.url}" target="_blank" rel="noopener noreferrer">${Citations.escape(ref.label)}</a> <a class="source-text-link" href="${ref.textUrl}" target="_blank" rel="noopener noreferrer">Naskah penerbit</a></li>`; }).join('')}</ol><h4>Konteks Indonesia</h4><ul>${article.sources.map(([label,url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join('')}</ul>`;
  }
};
