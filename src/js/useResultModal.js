export const useResultModal = (callback) => {
  const resultModal = document.querySelector('[data-modal="result-modal"]'),
    resultModalText = resultModal.querySelector('[data-modal-text]'),
    resultModalCloseBtn = resultModal.querySelector('[data-modal-close]')

  const setResultText = (text) => {
    resultModalText.innerHTML = text
  }

  resultModalCloseBtn.addEventListener('click', callback)

  return { setResultText }
}