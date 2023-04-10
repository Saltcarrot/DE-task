export const usePageScroll = () => {
  const header = document.querySelector('[data-header]')

  const onWindowScrollHandler = () => {
    if (window.scrollY > header.getBoundingClientRect().height)
      header.classList.add('sticky')
    else header.classList.remove('sticky')
  }

  window.addEventListener('scroll', onWindowScrollHandler)
}
