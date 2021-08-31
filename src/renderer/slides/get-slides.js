module.exports.getSlides = function () {
  const pageContent = [
    ...document.querySelectorAll('.notion-page-content > div')
  ]
  const newSlides = pageContent.filter(item =>
    item.classList.contains('notion-header-block')
  )

  const newSlide = block => ({
    title: block,
    blocks: []
  })

  let currentSlide

  const slides = pageContent
    .map(block => {
      const isNewSlide = newSlides.find(slide => slide === block)

      if (isNewSlide) {
        currentSlide = newSlide(block)
        currentBlock = undefined
        return currentSlide
      }

      currentSlide.blocks.push(block)
    })
    .filter(Boolean)

  return slides
}
