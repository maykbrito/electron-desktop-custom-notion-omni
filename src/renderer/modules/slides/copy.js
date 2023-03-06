async function copyCode(text) {
  await navigator.clipboard.writeText(text)
}

module.exports.createAndAttachCopyButtonToElement = function (attachToElement) {
  const button = document.createElement("button")
  button.innerText = "copy"
  button.classList.add("copyButton")
  button.onclick = async (e) => {
    let finalText = ""
    attachToElement.firstChild.querySelectorAll("span").forEach((span) => {
      finalText += span.innerText
    })

    await copyCode(finalText)
  }

  attachToElement.appendChild(button)
}
