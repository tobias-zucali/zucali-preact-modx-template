import { useRef, useState } from 'preact/hooks'

import useImagePreload from '../useImagePreload'
import useOnScroll from '../useOnScroll'
import getCmsImageUrl from '../../utils/getCmsImageUrl'


const SCROLL_POSITION_GAP = 0.5
const IS_BROWSER = (typeof window !== 'undefined')

const screen = (IS_BROWSER && window.screen) || {
  height: 800,
  width: 1200,
}
const backgroundImageSize = {
  height: screen.height * 1.2,
  width: screen.width * 1.2,
}

const getTop = (event, sectionElement) => {
  const {
    windowHeight: viewportHeight,
    scrollTop: viewportTop,
  } = event
  const viewportBottom = viewportTop + viewportHeight

  const {
    offsetTop,
    offsetHeight,
  } = sectionElement
  const firstVisibleHeight = offsetTop
  const lastVisibleHeight = offsetTop + offsetHeight

  const fromTop = viewportBottom - firstVisibleHeight
  const fromBottom = lastVisibleHeight - viewportTop

  if (fromTop < 0) {
    return 1
  }
  if (fromTop < viewportHeight) {
    return 1 - (fromTop / viewportHeight)
  }
  if (fromBottom < 0) {
    return -1
  }
  if (fromBottom < viewportHeight) {
    return (fromBottom / viewportHeight) - 1
  }
  return 0

  // if (fromTop < 0) {
  //   return viewportHeight
  // }
  // if (fromTop < viewportHeight) {
  //   return viewportHeight - fromTop
  // }
  // if (fromBottom < 0) {
  //   return viewportHeight * -1
  // }
  // if (fromBottom < viewportHeight) {
  //   return (viewportHeight - fromBottom) * -1
  // }
  // return 0
}


export default function useSectionBackground(path) {
  const url = getCmsImageUrl({ path, ...backgroundImageSize })
  const isCoverImageLoaded = useImagePreload(url)

  const sectionRef = useRef()
  const [top, setTop] = useState(0)
  useOnScroll((event) => {
    const newTop = getTop(event, sectionRef.current)
    if (top !== newTop) {
      setTop(newTop)
    }
  })

  const isVisible = isCoverImageLoaded

  return {
    url,
    isVisible,
    top,
    sectionRef,
  }
}
