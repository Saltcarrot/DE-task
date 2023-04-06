export const useForm = (callbackOnSubmit) => {
  const form = document.forms['feedback-form']

  const inputs = form.querySelectorAll(`.form-input`)
  const labels = form.querySelectorAll('label')
  const errors = form.querySelectorAll('.form-error')

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

  const reset = () => {
    inputs.forEach((input, idx) => {
      input.value = ''

      if (input.classList.contains('error'))
        input.classList.remove('error')
      if (labels[idx].classList.contains('error'))
        labels[idx].classList.remove('error')
      if (errors[idx].innerHTML !== '') errors[idx].innerHTML = ''
    })
  }

  form.addEventListener('submit', onSubmitHandler)

  return { reset }
}
