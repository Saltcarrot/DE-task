import './style/index.sass'
import './home.sass'

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header')

  const onWindowScrollHandler = () => {
    if (window.scrollY > header.getBoundingClientRect().height)
      header.classList.add('sticky')
    else header.classList.remove('sticky')
  }

  window.addEventListener('scroll', onWindowScrollHandler)
})