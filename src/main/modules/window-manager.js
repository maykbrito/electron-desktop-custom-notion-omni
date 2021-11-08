import { ipcMain, BrowserWindow } from 'electron'
import { assetsPath } from '../utils/assets-path'

ipcMain.on('request-app-path', (event, arg) => {
  event.returnValue = assetsPath
})

ipcMain.on('minimize', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  win.minimize()
})

ipcMain.on('expand', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.restore()
  } else {
    win.maximize()
  }
})

ipcMain.on('close', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  win.close()
})
