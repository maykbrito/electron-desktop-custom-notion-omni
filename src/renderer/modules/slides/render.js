const { createMainFrame } = require("./main-frame.js")
const { createSlideElement } = require("./slide-element.js")

const $slide = createSlideElement()

module.exports.$slide = $slide

module.exports.getMainFrame = () => {
  const mainFrame = createMainFrame()
  mainFrame.appendChild($slide)
  document.body.appendChild(mainFrame)
  return mainFrame
}

module.exports.render = ($slide, currentSlide) => {
  $slide.innerHTML = ""
  if (!currentSlide) return

  for (let block of currentSlide.blocks) {
    const buildBlock = block.cloneNode(true)
    buildBlock.classList.add("appear")
    $slide.appendChild(buildBlock)
  }
}
