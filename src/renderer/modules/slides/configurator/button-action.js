const Modal = require("./modal.js")

const ButtonAction = {
  targetElement: () => document.querySelector("#notion-app div.notion-page-controls"),
  createButton(Modal) {
    const content = `
  <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 24 24" style="width: 14px; height: 14px; display: block; fill: rgba(255, 255, 255, 0.282); flex-shrink: 0; margin-right: 6px;" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
  Add script
  `

    const button = document.createElement('div');
    button.classList.add('add-script-button');
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('style', `user-select: none; transition: opacity 100ms ease 0s; cursor: pointer; opacity: 0; display: inline-flex; align-items: center; flex-shrink: 0; white-space: nowrap; height: 28px; border-radius: 6px; font-size: 14px; line-height: 1.2; min-width: 0px; padding-left: 6px; padding-right: 8px; color: rgba(255, 255, 255, 0.282); pointer-events: none;`);
    button.onmouseover = () => button.style.background = 'rgba(255, 255, 255, 0.055)';
    button.onmouseout = () => button.style.background = 'transparent';
    // button.innerText = 'ಠ';
    button.innerHTML = content;
    button.onclick = Modal.open;
    button.onkeydown = ({ key }) => key === 'Space' && Modal.open();
    return button;
  },
  addToTargetElement() {
    const targetElement = this.targetElement();

    if (targetElement && !targetElement.querySelector('.add-script-button')) {
      const button = this.createButton(Modal);
      targetElement.appendChild(button);
    }
  },
  removeFromTargetElement() {
    const targetElement = this.targetElement();
    if (targetElement) {
      const button = targetElement.querySelector('.add-script-button');
      if (button) {
        targetElement.removeChild(button);
      }
    }
  },
}

module.exports = ButtonAction;