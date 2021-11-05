const { ipcRenderer } = require('electron')
const injectCSS = require('../../utils/inject-css')

const createWindowControls = require('./create-window.controls')

function createWindowsMenu() {
  injectCSS(
    'src',
    'renderer',
    'modules',
    'window-manager',
    'windowControls.css'
  )

  const windowControlsMenu = createWindowControls()
  document.body.appendChild(windowControlsMenu)

  const hideMenu = () => windowControlsMenu.classList.remove('active')

  window.addEventListener('mousemove', event => {
    const { pageX, pageY } = event
    const { x, height, y } = windowControlsMenu.getBoundingClientRect()
    if (pageY <= 10 && pageX > x) {
      if (!windowControlsMenu.classList.contains('active')) {
        windowControlsMenu.classList.add('active')
      }
    }

    if (pageY > y + height + 10 || pageX < x) {
      if (windowControlsMenu.classList.contains('active')) {
        hideMenu()
      }
    }
  })

  const minimize_btn = document.getElementById('minimize')
  minimize_btn.onclick = () => {
    ipcRenderer.send('minimize')
    hideMenu()
  }

  const maxime_btn = document.getElementById('expand')
  maxime_btn.onclick = () => {
    ipcRenderer.send('expand')
    hideMenu()
  }

  const close_btn = document.getElementById('close')
  close_btn.onclick = () => {
    ipcRenderer.send('close')
    hideMenu()
  }
}

module.exports = createWindowsMenu
