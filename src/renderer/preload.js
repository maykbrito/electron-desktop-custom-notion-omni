const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')
const appPath = ipcRenderer.sendSync('request-app-path')
const cssContent = fs.readFileSync(
  path.resolve(appPath, 'src', 'renderer', 'styles', 'style.css')
)

window.addEventListener('DOMContentLoaded', () => {
  const styleEl = document.createElement('style')
  styleEl.innerHTML = cssContent
  document.head.append(styleEl)

  require('./slides/index.js')
})
