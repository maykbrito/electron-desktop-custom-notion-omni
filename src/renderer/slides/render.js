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

module.exports.render = ($slide, data, slideIndex) => {
  $slide.innerHTML = ''
  var slide = data[slideIndex]
  $slide.appendChild(slide.title.cloneNode(true))
  slide.blocks.forEach(block => {
    $slide.appendChild(block.cloneNode(true))
  })
}
