const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')
const appPath = ipcRenderer.sendSync('request-app-path')

const isMac = process.platform === "darwin"
// const isMac = true //Testando fora do mac

function createWindowControls() {
  injectCSS(
    path.resolve(appPath, 'src', 'renderer', 'styles', 'windowControls.css')
  )

  const iconsFolder = path.resolve(appPath, 'assets', 'windowsIcons')
  const wrapper = document.createElement('div')
  wrapper.id = 'window-controls-wrapper'

  wrapper.dataset.platform = process.platform
  // wrapper.dataset.platform = "darwin" //Testando fora do mac

  wrapper.innerHTML = isMac ? 
  `
  <div class="mac-button" id="close"></div>
  <div class="mac-button" id="expand"></div>
  <div class="mac-button" id="minimize"></div>`
  : `
  <div class="button" id="minimize">
    ${fs.readFileSync(path.resolve(iconsFolder, 'minimize.svg'))}
  </div>
  <div class="button" id="expand">
    ${fs.readFileSync(path.resolve(iconsFolder, 'square.svg'))}
  </div>
  <div class="button" id="close">
    ${fs.readFileSync(path.resolve(iconsFolder, 'close.svg'))}
  </div>`
  return wrapper
}

function injectCSS(cssPath) {
  const cssContent = fs.readFileSync(cssPath)
  const styleEl = document.createElement('style')
  styleEl.innerHTML = cssContent
  document.head.append(styleEl)
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



window.addEventListener('DOMContentLoaded', () => {
  injectCSS(path.resolve(appPath, 'src', 'renderer', 'styles', 'style.css'))
  if (isMac) {
    createMacMenu()
  }else{
    createWindowsMenu()
  }

  /** slides feat */
  injectCSS(path.resolve(appPath, 'src', 'renderer', 'styles', 'slides.css'))
  require('./slides/index.js')
})
