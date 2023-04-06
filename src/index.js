import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header')
  const feedbackBtn = document.querySelector('.feedback-btn')
  const body = document.querySelector('body')

  const modalBg = document.querySelector('.modal-bg')
  const modalContainer = document.querySelector('.modal-container')
  const modalCloseBtn = document.querySelector('.modal-close-btn')

  const onWindowScrollHandler = () => {
    if (window.scrollY > header.getBoundingClientRect().height)
      header.classList.add('sticky')
    else header.classList.remove('sticky')
  }

  const onModalCloseHandler = () => {
    body.classList.remove('fixed')
    modalBg.classList.add('hidden')
    // reset form
  }

  const onFeedBackBtnClickHandler = () => {
    body.classList.add('fixed')
    modalBg.classList.remove('hidden')
  }

  const onModalContainerClickHandler = (event) => {
    event.stopPropagation()
  }

  window.addEventListener('scroll', onWindowScrollHandler)

  feedbackBtn.addEventListener('click', onFeedBackBtnClickHandler)

  modalBg.addEventListener('click', onModalCloseHandler)
  modalContainer.addEventListener('click', onModalContainerClickHandler)
  modalCloseBtn.addEventListener('click', onModalCloseHandler)
})
