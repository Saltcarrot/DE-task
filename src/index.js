import {usePageScroll, useForm, useModal, useFetch} from './js'
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

    fetchFeedbackData(values)
      .then(res => {
        resultModalText.innerHTML =
          res
            ? 'Your message successfully sent!'
            : 'Form sent unsuccessful'
      })
      .catch(err => {
        resultModalText.innerHTML = err
      })
      .finally(() => {
        closeFormModal()
        resetForm()
        enableForm()

        onResultModalOpenHandler()
      })
  }

  const { resetForm, disableForm, enableForm } = useForm(onSubmit)
  const { fetchFeedbackData } = useFetch()

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
