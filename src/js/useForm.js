export const useForm = (callbackOnSubmit) => {
  const form = document.forms['feedback-form']

  const inputs = form.querySelectorAll(`.form-input`)
  const labels = form.querySelectorAll('label')
  const errors = form.querySelectorAll('.form-error')

  const submitBtn = form.querySelector('button[type="submit"]')
  const submitBtnInitHTML = submitBtn.innerHTML

  const checkInput = (input, idx) => {
    if (input.value === '') {
      input.classList.add('error')
      labels[idx].classList.add('error')
      errors[idx].innerHTML = 'Required field'

      return false
    }

    if (
      input.name === 'email' &&
      !input.value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)
    ) {
      input.classList.add('error')
      labels[idx].classList.add('error')
      errors[idx].innerHTML = 'Invalid email'

      return false
    }

    if (input.name === 'name' && input.value.trim().split(' ').length !== 2) {
      input.classList.add('error')
      labels[idx].classList.add('error')
      errors[idx].innerHTML = 'Invalid full name'

      return false
    }

    if (input.classList.contains('error'))
      input.classList.remove('error')
    if (labels[idx].classList.contains('error'))
      labels[idx].classList.remove('error')
    if (errors[idx].innerHTML !== '') errors[idx].innerHTML = ''

    return true
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    const validInputs = []

    inputs.forEach((input, idx) =>
      validInputs.push(checkInput(input, idx))
    )

    if (validInputs.filter(valid => !!valid).length === inputs.length) {
      const values = {}

      inputs.forEach(input =>
        values[input.name] = input.value
      )
      callbackOnSubmit(values)
    }
  }

  const resetForm = () => {
    inputs.forEach((input, idx) => {
      input.value = ''

      if (input.classList.contains('error'))
        input.classList.remove('error')
      if (labels[idx].classList.contains('error'))
        labels[idx].classList.remove('error')
      if (errors[idx].innerHTML !== '') errors[idx].innerHTML = ''
    })
  }

  const disableForm = () => {
    inputs.forEach(input => {
      input.disabled = true
      submitBtn.disabled = true
      submitBtn.innerHTML = 'Sending...'
    })
  }

  const enableForm = () => {
    inputs.forEach(input => {
      input.disabled = false
      submitBtn.disabled = false
      submitBtn.innerHTML = submitBtnInitHTML
    })
  }

  form.addEventListener('submit', onSubmitHandler)

  return { resetForm, disableForm, enableForm }
}
