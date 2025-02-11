const ButtonAction = require('./button-action.js')
require('./highlight.js')
const injectCSS = require("../../../utils/inject-css.js")
injectCSS('src', 'renderer', 'modules', 'slides', 'configurator', 'highlight.css')
injectCSS('src', 'renderer', 'modules', 'slides', 'configurator', 'modal.css')

const observer = new MutationObserver((mutationsList) => {
  /* need to observe to show or hide the script button */
  const notionControls = showOrHideButton.targetElement();
  if (notionControls) {
    showOrHideButton.observer().observe(notionControls, { attributeFilter: ['style'], attributes: true })
  }

  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const configurator = [...document.querySelectorAll('div[contenteditable="true"]')].find(
        div => div.textContent.includes('[enable-slide-configurator=true]')
      )

      if (configurator) {
        ButtonAction.addToTargetElement();
      } else {
        ButtonAction.removeFromTargetElement();
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });


/* need to observe to show or hide custom button */
const showOrHideButton = {
  targetElement: () => document.querySelector('.notion-page-controls > div:first-child'),
  elementoParaAplicarEstilo: () => document.querySelector('.add-script-button'),
  observer: () => new MutationObserver((mutationsList) => {
    const targetElement = showOrHideButton.targetElement();
    const elementoParaAplicarEstilo = showOrHideButton.elementoParaAplicarEstilo();

    if (!targetElement || !elementoParaAplicarEstilo) return;

    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const novoEstilo = targetElement.getAttribute('style');
        elementoParaAplicarEstilo.setAttribute('style', novoEstilo);
      }
    }
  })
}

