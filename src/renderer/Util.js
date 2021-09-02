const fs = require('fs')
const path = require('path')

function injectCSS(...cssPathSegments) {
    const cssContent = fs.readFileSync(path.resolve(...cssPathSegments))
    const styleEl = document.createElement('style')
    styleEl.innerHTML = cssContent
    document.head.append(styleEl)
}

function loadSVG(...SVGPathSegments) {
    return fs.readFileSync(path.resolve(...SVGPathSegments))
}

module.exports = { loadSVG, injectCSS }