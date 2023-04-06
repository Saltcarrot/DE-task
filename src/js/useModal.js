export const useModal = (modalID, callBackOnClose) => {
  const body = document.querySelector('body')

  const modalBg = document.getElementById(modalID)
  const modalContainer = modalBg.querySelector('.modal-container')
  const modalCloseBtn = modalBg.querySelector('.modal-close-btn')

  const closeModal = () => {
    body.classList.remove('fixed')
    modalBg.classList.add('hidden')
  }

  const onModalCloseHandler = () => {
    closeModal()

    callBackOnClose()
  }

  const openModal = () => {
    body.classList.add('fixed')
    modalBg.classList.remove('hidden')
  }

  const onModalContainerClickHandler = (event) => {
    event.stopPropagation()
  }

  modalBg.addEventListener('click', onModalCloseHandler)
  modalContainer.addEventListener('click', onModalContainerClickHandler)
  modalCloseBtn.addEventListener('click', onModalCloseHandler)

  return { openModal, closeModal }
}
