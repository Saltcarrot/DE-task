import { usePageScroll, useForm, useModal } from "./js";
import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  usePageScroll()

  const onSubmit = (values) => {
    console.log(values);

    reset()
    closeModal()
  }

  const { reset } = useForm(onSubmit)

  const { onModalOpenHandler, closeModal } = useModal(reset)

  const feedbackBtn = document.querySelector('.feedback-btn')

  feedbackBtn.addEventListener('click', onModalOpenHandler)
})
