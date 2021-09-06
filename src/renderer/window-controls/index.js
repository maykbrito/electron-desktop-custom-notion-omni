const { ipcRenderer } = require('electron')
const path = require('path')
const { injectCSS, loadSVG } = require("../Util.js")

const appPath = ipcRenderer.sendSync('request-app-path')

const isMac = process.platform === "darwin" || ipcRenderer.sendSync('isMac')

function createWindowControls() {
  injectCSS(
    path.resolve(appPath, 'src', 'renderer', 'styles', 'windowControls.css')
  )

  const iconsFolder = path.resolve(appPath, 'assets', 'windowsIcons')
  const wrapper = document.createElement('div')
  wrapper.id = 'window-controls-wrapper'

  wrapper.dataset.platform = isMac ? "darwin" : ""

  wrapper.innerHTML = isMac ?
    `
  <div class="mac-button" id="close"></div>
  <div class="mac-button" id="minimize"></div>
  <div class="mac-button" id="fullscreen"></div>`
    : `
  <div class="button" id="minimize">
    ${loadSVG(iconsFolder, 'minimize.svg')}
  </div>
  <div class="button" id="expand">
    ${loadSVG(iconsFolder, 'square.svg')}
  </div>
  <div class="button" id="close">
    ${loadSVG(iconsFolder, 'close.svg')}
  </div>`
  return wrapper
}



function createWindowsMenu() {
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
  addWindowControlsFunctions(windowControlsMenu)
}

function addWindowControlsFunctions(menu) {

  const hideMenu = () => menu.classList.remove('active')

  const minimize_btn = document.getElementById('minimize')
  minimize_btn.onclick = () => {
    ipcRenderer.send('minimize')
    hideMenu()
  }

  const close_btn = document.getElementById('close')
  close_btn.onclick = () => {
    ipcRenderer.send('close')
    hideMenu()
  }

  if(isMac){
    const fullscreen_btn = document.getElementById('fullscreen')
    fullscreen_btn.onclick = () => ipcRenderer.send('fullscreen')
  }else{
    const maxime_btn = document.getElementById('expand')
    maxime_btn.onclick = () => {
      ipcRenderer.send('expand')
      hideMenu()
    }
  }
}

function createMacMenu() {

  const windowControlsMenu = createWindowControls()
  document.body.appendChild(windowControlsMenu)

  const hideMenu = () => windowControlsMenu.classList.remove('active')

  window.addEventListener('mousemove', event => {
    const { pageX, pageY } = event
    const { x, height, y, width } = windowControlsMenu.getBoundingClientRect()

    if (pageY <= 10 && pageX < x + width) {
      if (!windowControlsMenu.classList.contains('active')) {
        windowControlsMenu.classList.add('active')
      }
    }

    if (pageY > y + height + 20 || pageX > x + width + 10) {
      if (windowControlsMenu.classList.contains('active')) {
        hideMenu()
      }
    }
  })

  addWindowControlsFunctions(windowControlsMenu)
}


if (isMac) {
    createMacMenu()
} else {
    createWindowsMenu()
}
