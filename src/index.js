import {usePageScroll, useForm, useModal, useFetch, useResultModal} from './js'
import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  usePageScroll()

  const feedbackBtn = document.querySelector('[data-action-btn="feedback-btn"]')

  const onSubmit = (values) => {
    disableForm()

    fetchFeedbackData(values)
      .then(res => setResultText(
        res
          ? 'Your message successfully sent!'
          : 'Form sent unsuccessful'
      ))
      .catch(err => setResultText(err))
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
    setResultText('')
  }

  const { setResultText } = useResultModal(onCloseResultModalHandler)

  feedbackBtn.addEventListener('click', onFeedbackBtnCLickHandler)
})
