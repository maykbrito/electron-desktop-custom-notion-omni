let showingOnlyContent = false
const elementsToHide = [
  '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > header',
  '.notion-ai-button'
]
let notionFrameInitialHeight
let elementsInitialDisplay = {}

window.addEventListener('keydown', ev => {
  const shortcutKeys = ev.key === 'Escape' && ev.ctrlKey
  if (shortcutKeys) {
    showingOnlyContent = !showingOnlyContent
    showingOnlyContent ? hide() : show()
  }
})

const elementDisplay = (element, display) => {
  const currentElement = document.querySelector(element)
  console.log({ currentElement })
  if (!currentElement) return

  if (display === 'initial') {
    currentElement.style.display = elementsInitialDisplay[element]
    return
  }

  elementsInitialDisplay[element] = currentElement.style.display
  currentElement.style.display = display;
}

const hide = () => {
  elementsToHide.forEach(element => elementDisplay(element, 'none'))

  notionFrameInitialHeight = document.querySelector('.notion-frame').style.height
  document.querySelector('.notion-frame').style.height = '100vh'
}
const show = () => {
  elementsToHide.forEach(element => elementDisplay(element, 'initial'))
  document.querySelector('.notion-frame').style.height = notionFrameInitialHeight
}
