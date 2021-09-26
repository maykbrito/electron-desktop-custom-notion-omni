module.exports.backgroundCover = function () {
  let bgImage = document.querySelector("img[src*='cover']")

  if (!bgImage) return

  let imgElement = document.createElement('img')
  imgElement.src = bgImage.src
  imgElement.classList.add('slides__cover-image')

  return imgElement
}
