import { shell } from 'electron'
/**
 * This function is used electron's new-window event
 * It allows non-electron links to be opened with the computer's default browser
 * Keep opening pop-ups for google login for example
 * @param {NewWindowEvent} e
 * @param {String} url
 */
function checkerURL(e, url) {
  const isNotUrlOfTheNotion = !url.match('/www.notion.so/')

  if (isNotUrlOfTheNotion) {
    e.preventDefault()
    shell.openExternal(url)
  }
}

export { checkerURL }
