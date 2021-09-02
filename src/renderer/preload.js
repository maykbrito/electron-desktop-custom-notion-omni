const { ipcRenderer } = require('electron')
const path = require('path')
const { injectCSS } = require('./Util.js')

const appPath = ipcRenderer.sendSync('request-app-path')

window.addEventListener('DOMContentLoaded', () => {
  //Inject theme
  injectCSS(path.resolve(appPath, 'src', 'renderer', 'styles', 'style.css'))

  //Add window controls
  require('./window-controls/index.js')

  /** slides feat */
  injectCSS(path.resolve(appPath, 'src', 'renderer', 'styles', 'slides.css'))
  require('./slides/index.js')
})
