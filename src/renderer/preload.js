const injectCSS = require("./utils/inject-css")

window.addEventListener("DOMContentLoaded", () => {
  injectCSS("src", "renderer", "styles", "style.css")

  if (process.platform !== "darwin") {
    require("./modules/window-manager/create-windows-menu")()
  }

  /** slides feat */
  require("./modules/slides/index.js")

  /** content-only feat */
  require("./modules/content-only")

  // drag and move window
  var windowTopBar = document.createElement("div")
  windowTopBar.id = "maykbrito-eh-o-brabo"
  windowTopBar.style.width = "100%"
  windowTopBar.style.height = "2.75rem"
  windowTopBar.style.position = "absolute"
  windowTopBar.style.top = windowTopBar.style.left = 0
  windowTopBar.style.webkitAppRegion = "drag"
  windowTopBar.style.pointerEvents = "none"
  document.body.appendChild(windowTopBar)
})
