const { getSlides } = require('./get-slides.js')
const { render, $slide, getMainFrame } = require('./render.js')

let data
let slideIndex = 0
let isRunning = false
let mainFrame

window.addEventListener('keydown', function (ev) {
  if (ev.key === 'Escape' && ev.shiftKey) {
    isRunning ? hide() : show()
    isRunning = !isRunning
  }
})

function show() {
  mainFrame && mainFrame.parentNode.removeChild(mainFrame)
  start()
}

function hide() {
  mainFrame.style.display = 'none'
  window.removeEventListener('keydown', control)
}

function control(ev) {
  switch (ev.key) {
    case 'ArrowLeft':
      move('backward')
      break
    case 'ArrowRight':
      move('forward')
      break
  }
}

function move(dir) {
  var dx = dir === 'backward' ? -1 : 1

  const isLeft = dx === -1

  if (isLeft) {
    if (slideIndex - 1 < 0) {
      return
    } else {
      slideIndex--
    }
  } else {
    if (slideIndex + 1 >= data.length) {
      return
    } else {
      slideIndex++
    }
  }

  render($slide, data[slideIndex])
}

function start() {
  data = getSlides()
  mainFrame = getMainFrame()

  window.addEventListener('keydown', control)

  render($slide, data[0])
}
