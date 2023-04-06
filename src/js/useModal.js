export const useModal = (callBackOnClose) => {
  const body = document.querySelector('body')

  const modalBg = document.querySelector('.modal-bg')
  const modalContainer = document.querySelector('.modal-container')
  const modalCloseBtn = document.querySelector('.modal-close-btn')

  const closeModal = () => {
    body.classList.remove('fixed')
    modalBg.classList.add('hidden')
  }

  const onModalCloseHandler = () => {
    closeModal()

    callBackOnClose()
  }

  const onModalOpenHandler = () => {
    body.classList.add('fixed')
    modalBg.classList.remove('hidden')
  }

  const onModalContainerClickHandler = (event) => {
    event.stopPropagation()
  }

  modalBg.addEventListener('click', onModalCloseHandler)
  modalContainer.addEventListener('click', onModalContainerClickHandler)
  modalCloseBtn.addEventListener('click', onModalCloseHandler)

  return { onModalOpenHandler, closeModal }
}
