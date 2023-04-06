import { usePageScroll, useForm, useModal } from "./js";
import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  usePageScroll()

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
        if (res.id) {
          closeModal()
          resetForm()
          enableForm()
        }
      })
  }

  const { resetForm, disableForm, enableForm } = useForm(onSubmit)

  const { onModalOpenHandler, closeModal } = useModal(resetForm)

  const feedbackBtn = document.querySelector('.feedback-btn')

  feedbackBtn.addEventListener('click', onModalOpenHandler)
})
