export const useForm = (callbackOnSubmit) => {
  const form = document.querySelector('[data-form="feedback-form"]')

  const inputs = form.querySelectorAll('[data-form-input]')
  const labels = form.querySelectorAll('[data-form-label]')
  const errors = form.querySelectorAll('[data-form-error]')

  const submitBtn = form.querySelector('[data-form-submit]')
  const submitBtnInitHTML = submitBtn.innerHTML

  const setFieldGroupInvalid = (input, message) => {
    const label = input.previousElementSibling
    const error = input.nextElementSibling

    if (!input.classList.contains('error'))
      input.classList.add('error')
    if (!label.classList.contains('error'))
      label.classList.add('error')
    if (error.innerHTML === '') error.innerHTML = message
  }

  const setFieldGroupValid = (input) => {
    const label = input.previousElementSibling
    const error = input.nextElementSibling

    if (input.classList.contains('error'))
      input.classList.remove('error')
    if (label.classList.contains('error'))
      label.classList.remove('error')
    if (error.innerHTML !== '') error.innerHTML = ''
  }

  const checkInput = (input) => {
    switch (input.dataset.formInput) {
    case 'email': {
      if (
        !input.value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)
      ) {
        setFieldGroupInvalid(input, 'Invalid email')

        return false
      }

      setFieldGroupValid(input)
      return true
    }
    case 'name': {
      if (input.value.trim().split(' ').length !== 2) {
        setFieldGroupInvalid(input, 'Invalid full name')

        return false
      }

      setFieldGroupValid(input)
      return true
    }
    default: {
      if (input.value === '') {
        setFieldGroupInvalid(input, 'Required field')

        return false
      }

      setFieldGroupValid(input)
      return true
    }
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    const validInputs = []

    inputs.forEach((input) =>
      validInputs.push(checkInput(input))
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
