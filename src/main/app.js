import { app, BrowserWindow, screen, nativeImage } from "electron"
import windowStateKeeper from "electron-window-state"
import path from "path"

import { assetsPath } from "./utils/assets-path"
import { checkerURL } from "./utils/check-url"

import "./modules/window-manager"

let win = null
app.allowRendererProcessReuse = true

async function createWindow() {
  win = new BrowserWindow({
    icon: nativeImage.createFromPath(
      path.join(assetsPath, "assets", "icon.png")
    ),
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    draggable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  adjustWindow(win)

  win.loadURL("https://notion.so")

  win.webContents.on("new-window", checkerURL) // add event listener for URL check
}

function adjustWindow(win) {
  const mainScreen = screen.getPrimaryDisplay()
  const dimensions = mainScreen.size

  const mainWindowState = windowStateKeeper({
    defaultWidth: dimensions.width,
    defaultHeight: dimensions.height,
  })

  let { width, height, x, y } = mainWindowState
  x = x || 0
  y = y || 0

  win.setSize(width, height)
  win.setPosition(x, y)
  mainWindowState.manage(win)
}

const isUnicInstance = app.requestSingleInstanceLock() //Verifica se o app já foi iniciado

if (!isUnicInstance) {
  app.quit() // Caso o app já tiver sido aberto ele é fechado
} else {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app
    .whenReady()
    .then(createWindow)
    .catch((e) => console.error(e))
}

// Faz com que o programa não inicie várias vezes durante a instalação no windows
if (require("electron-squirrel-startup")) {
  app.quit()
}

app.on("second-instance", () => {
  const win = BrowserWindow.getAllWindows()[0]
  if (win.isMinimized()) {
    win.restore()
  }
  win.focus()
})

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", recreateWindow)

function recreateWindow() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    setTimeout(createWindow, 200)
  }
}
