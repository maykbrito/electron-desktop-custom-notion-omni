const { getSlides } = require('./get-slides.js')
const { render, $slide, getMainFrame } = require('./render.js')

let data
let slideIndex = 0
let blockIndex = 0
let isRunning = false
let mainFrame

window.addEventListener('keydown', function (ev) {
  if (ev.key === 'Escape' && ev.shiftKey) {
    isRunning ? (mainFrame.style.display = 'none') : start()
    isRunning = !isRunning
  }
})

function start() {
  if (mainFrame) {
    mainFrame.style.display = 'flex'
    return
  }

  data = getSlides()
  mainFrame = getMainFrame()

  window.addEventListener('keydown', function (ev) {
    switch (ev.key) {
      case 'ArrowLeft':
        move('backward')
        break
      case 'ArrowRight':
        move('forward')
        break
    }
  })

  render($slide, data, 0)

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

    console.log(
      `
        direction ${dx}
        totalSlides ${data.length}
        slideIndex ${slideIndex}
      `,
      data[slideIndex]
    )

    render($slide, data, slideIndex)
  }
}
