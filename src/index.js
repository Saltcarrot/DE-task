import { usePageScroll, useForm, useModal } from "./js";
import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  usePageScroll()

  const onSubmit = (values) => {
    console.log(values);

    reset()
  }

  const { reset } = useForm(onSubmit)

  const { onModalOpenHandler } = useModal(reset)

  const feedbackBtn = document.querySelector('.feedback-btn')

  feedbackBtn.addEventListener('click', onModalOpenHandler)
})
