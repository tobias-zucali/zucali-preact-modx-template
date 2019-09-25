import { useRef, useState } from 'preact/hooks'

import useImagePreload from '../useImagePreload'
import useOnScroll from '../useOnScroll'
import getCmsImageUrl from '../../utils/getCmsImageUrl'


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

  // fix fadeout on safari
  if (viewportTop <= 0 && offsetTop === 0) {
    return 0
  }

  const elementScrollPosition = (viewportBottom - offsetTop - windowHeight) / visibleHeight
  if (elementScrollPosition < 0 - SCROLL_POSITION_GAP) {
    return 0 - SCROLL_POSITION_GAP
  } else if (elementScrollPosition > SCROLL_POSITION_GAP + 1) {
    return SCROLL_POSITION_GAP + 1
  } else {
    return elementScrollPosition
  }
}


export default function useSectionBackground(path) {
  const url = getCmsImageUrl({ path })
  const isCoverImageLoaded = useImagePreload(url)

  const sectionRef = useRef()
  const [scrollPosition, setScrollPosition] = useState(0)
  useOnScroll((event) => {
    const newScrollPosition = getElementScrollPosition(event, sectionRef.current)
    if (scrollPosition !== newScrollPosition) {
      setScrollPosition(newScrollPosition)
    }
  })

  const isVisible = isCoverImageLoaded && scrollPosition >= 0 && scrollPosition <= 1
  const parallaxScale = (scrollPosition + SCROLL_POSITION_GAP) / (1 + 2 * SCROLL_POSITION_GAP)

  return {
    url,
    isVisible,
    parallaxScale,
    sectionRef,
  }
}
