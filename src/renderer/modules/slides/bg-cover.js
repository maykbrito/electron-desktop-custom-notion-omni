module.exports.backgroundCover = function () {
  let bgImage = document.querySelector(
    '#notion-app div.notion-scroller.vertical.horizontal img'
  )

  if (bgImage === 'undefined') return

  let imgElement = document.createElement('img')
  imgElement.src = bgImage.src
  imgElement.classList.add('slides__cover-image')

  return imgElement
}
