const { ipcRenderer } = require("electron")
const path = require("path")
const appPath = ipcRenderer.sendSync("request-app-path")
const fs = require("fs")

function injectCSS(...cssPathSegments) {
  const cssPath = path.resolve(appPath, ...cssPathSegments)
  const cssContent = fs.readFileSync(cssPath)
  const styleEl = document.createElement("style")
  styleEl.innerHTML = cssContent
  document.head.append(styleEl)
}

module.exports = injectCSS
