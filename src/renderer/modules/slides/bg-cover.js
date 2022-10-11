module.exports.backgroundCover = function () {
  let bgImage = document.querySelector(
    '#notion-app div.notion-scroller [contenteditable="false"] img[style*="height: 30vh"]'
  )

  if (bgImage === "undefined" || bgImage === null) return

  let imgElement = document.createElement("img")
  imgElement.src = bgImage.src
  imgElement.classList.add("slides__cover-image")

  return imgElement
}
