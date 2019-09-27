import isBrowser from '../isBrowser'


const { scrollingElement } = isBrowser ? window.document : {}

let isInitialLoad = true
const scrollPositions = {}

export default function storeScrollPosition({
  url,
  previous,
}) {
  if (isInitialLoad) {
    isInitialLoad = false
  } else if (scrollingElement) {
    scrollPositions[previous] = scrollingElement.scrollTop
    setTimeout(() => {
      scrollingElement.scrollTop = scrollPositions[url] || 0
    })
  }
}
