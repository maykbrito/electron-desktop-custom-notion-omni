const { createMainFrame } = require('./main-frame.js')
const { createSlideElement } = require('./slide-element.js')

const $slide = createSlideElement()

module.exports.$slide = $slide

module.exports.getMainFrame = () => {
  const mainFrame = createMainFrame()
  mainFrame.appendChild($slide)
  document.body.appendChild(mainFrame)
  return mainFrame
}

module.exports.render = ($slide, currentSlide) => {
  console.log('currentSlide', currentSlide)
  $slide.innerHTML = ''
  if (!currentSlide) return
  $slide.appendChild(currentSlide.title.cloneNode(true))
  currentSlide.blocks.forEach(block => {
    $slide.appendChild(block.cloneNode(true))
  })
}
