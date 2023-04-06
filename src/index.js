import { usePageScroll, useForm, useModal } from './js'
import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  usePageScroll()

  const feedbackBtn = document.querySelector('.feedback-btn')

  const resultModal = document.getElementById('result-modal'),
    resultModalText = resultModal.querySelector('.text'),
    resultModalCloseBtn = resultModal.querySelector('.modal-close-btn')

  const onSubmit = (values) => {
    disableForm()

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: `New post`,
        body: `${values.email} ${values.name} ${values.message}`,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        closeFormModal()
        resetForm()
        enableForm()

        if (res.id) {
          resultModalText.innerHTML = 'Your message successfully sent!'
          onResultModalOpenHandler()
        } else {
          resultModalText.innerHTML = 'Form sent unsuccessful'
          onResultModalOpenHandler()
        }
      })
  }

  const { resetForm, disableForm, enableForm } = useForm(onSubmit)

  const {
    openModal: onFeedbackBtnCLickHandler,
    closeModal: closeFormModal
  } = useModal('feedback-modal', resetForm)
  const {
    openModal: onResultModalOpenHandler,
    closeModal: closeResultModal
  } = useModal('result-modal', () => {})

  const onCloseResultModalHandler = () => {
    closeResultModal()
    resultModalText.innerHTML = ''
  }

  feedbackBtn.addEventListener('click', onFeedbackBtnCLickHandler)
  resultModalCloseBtn.addEventListener('click', onCloseResultModalHandler)
})
