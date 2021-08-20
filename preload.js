const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')
const appPath = ipcRenderer.sendSync('request-app-path')
const cssContent = fs.readFileSync(path.resolve(appPath, 'styles', 'style.css'))

window.addEventListener("DOMContentLoaded", () => {

function createWindowControls() {
  const iconsFolder = path.resolve(appPath, 'assets', 'windowsIcons')
  const wrapper = document.createElement('div')
  wrapper.id = "window-controls-wrapper"
  
  wrapper.innerHTML = `
  <div class="button" id="minimize">
    ${fs.readFileSync(path.resolve(iconsFolder, 'minimize.svg'))}
  </div>
  <div class="button" id="expand">
    ${fs.readFileSync(path.resolve(iconsFolder, 'square.svg'))}
  </div>
  <div class="button" id="close">
    ${fs.readFileSync(path.resolve(iconsFolder, "close.svg"))}
  </div>`
  return wrapper
}
  const styleEl = document.createElement("style");
  styleEl.innerHTML = cssContent
  document.head.append(styleEl);
});