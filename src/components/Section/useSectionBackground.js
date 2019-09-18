import { useRef, useState } from 'preact/hooks'

import useImagePreload from '../../hooks/useImagePreload'
import useScrollCallback from '../../hooks/useScrollCallback'
import getCmsImageUrl from '../../utils/getCmsImageUrl'


const BACKGROUND_MARGIN = 100
const SCROLL_POSITION_GAP = 0.5

const getElementScrollPosition = (event, element) => {
  const {
    windowHeight,
    scrollTop: viewportTop,
  } = event
  const viewportBottom = viewportTop + windowHeight

  const {
    offsetTop,
    offsetHeight,
  } = element
  const visibleHeight = offsetHeight + windowHeight

  const scrollPosition = (viewportBottom - offsetTop - windowHeight) / visibleHeight
  if (scrollPosition < 0 - SCROLL_POSITION_GAP) {
    return 0 - SCROLL_POSITION_GAP
  } else if (scrollPosition > SCROLL_POSITION_GAP + 1) {
    return SCROLL_POSITION_GAP + 1
  } else {
    return scrollPosition
  }
}


export default function useSectionBackground(path) {
  const url = getCmsImageUrl({ path })
  const isCoverImageLoaded = useImagePreload(url)

  const sectionRef = useRef()
  const [scrollPosition, setScrollPosition] = useState(0)
  useScrollCallback((event) => {
    const newScrollPosition = getElementScrollPosition(event, sectionRef.current)
    if (scrollPosition !== newScrollPosition) {
      setScrollPosition(newScrollPosition)
    }
  })

  const isVisible = isCoverImageLoaded && scrollPosition >= 0 && scrollPosition <= 1
  const topOffset = (scrollPosition + SCROLL_POSITION_GAP) * BACKGROUND_MARGIN
  const sideOffset = ((1 + SCROLL_POSITION_GAP - scrollPosition) * BACKGROUND_MARGIN) / 2

  return {
    url,
    isVisible,
    topOffset,
    sideOffset,
    sectionRef,
  }
}
