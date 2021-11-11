const injectCSS = require('./utils/inject-css')

window.addEventListener('DOMContentLoaded', () => {
  injectCSS('src', 'renderer', 'styles', 'style.css')

  if (process.platform !== 'darwin') {
    require('./modules/window-manager/create-windows-menu')()
  }

  /** slides feat */
  require('./modules/slides/index.js')

  /** content-only feat */
  require('./modules/content-only')
})
