/* The complete lesson remains readable when JavaScript is unavailable. */
document.querySelector('.quiz')?.addEventListener('click', event => {
  const button = event.target.closest('[data-answer]');
  if (!button) return;
  const correct = button.dataset.correct === 'true';
  document.querySelectorAll('[data-answer]').forEach(option => {
    option.setAttribute('aria-pressed', String(option === button));
    option.classList.remove('is-wrong');
  });
  button.classList.toggle('is-wrong', !correct);
  const feedback = document.querySelector('#quiz-feedback');
  feedback.textContent = `${correct ? '✓ Tepat! ' : 'Belum tepat. '}${button.dataset.feedback}${correct ? '' : ' Kamu bisa mencoba lagi.'}`;
  feedback.classList.toggle('is-wrong', !correct);
  feedback.hidden = false;
  feedback.classList.remove('feedback-pop');
  void feedback.offsetWidth;
  feedback.classList.add('feedback-pop');
});
