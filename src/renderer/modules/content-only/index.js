let showingOnlyContent = false
const elementsToHide = [
  '.notion-cursor-listener > div:nth-child(2) > div:nth-child(1)',
  '.notion-help-button',
  '.notion-frame > div.notion-scroller.vertical.horizontal > div:nth-child(2) > div'
]
let notionFrameInitialHeight

window.addEventListener('keydown', ev => {
  const shortcutKeys = ev.key === 'Escape' && ev.ctrlKey
  if (shortcutKeys) {
    showingOnlyContent = !showingOnlyContent
    showingOnlyContent ? hide() : show()
  }
})

const elementDisplay = (element, display) => {
  if (!document.querySelector(element)) return

  document.querySelector(element).style.display = display
}

const hide = () => {
  elementsToHide.forEach(element => elementDisplay(element, 'none'))

  notionFrameInitialHeight =
    document.querySelector('.notion-frame').style.height
  document.querySelector('.notion-frame').style.height = '100vh'
}
const show = () => {
  elementsToHide.forEach(element => elementDisplay(element, 'initial'))
  document.querySelector('.notion-frame').style.height =
    notionFrameInitialHeight
}
