import { useEffect, useRef, useState } from 'preact/hooks'
import isEqual from 'lodash/isEqual'

import useImagePreload from '../useImagePreload'
import useOnScroll from '../useOnScroll'
import getCmsImageUrl from '../../utils/getCmsImageUrl'

import config from '../../config'


// inspired by https://gist.github.com/gre/1650294 and https://joshondesign.com/2013/03/01/improvedEasingEquations
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

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

const getPositions = (event, sectionElement) => {
  const {
    windowHeight: viewportHeight,
    scrollTop: viewportTop,
  } = event
  const viewportBottom = viewportTop + viewportHeight

  const {
    offsetTop,
    offsetHeight,
  } = sectionElement
  const firstVisibleTop = offsetTop
  const lastVisibleTop = offsetTop + offsetHeight
  const visibleHeight = offsetHeight + viewportHeight

  const fromTop = viewportBottom - firstVisibleTop
  const fromBottom = lastVisibleTop - viewportTop

  let top = 0
  if (fromTop < 0) {
    top = 1
  } else if (fromTop < viewportHeight) {
    top = 1 - easeInOutQuad(fromTop / viewportHeight)
  } else if (fromBottom < 0) {
    top = -1
  } else if (fromBottom < viewportHeight) {
    top = easeInOutQuad(fromBottom / viewportHeight) - 1
  }

  let progress = 0
  if (fromTop > visibleHeight) {
    progress = 1
  } else if (fromTop > 0 && fromTop < visibleHeight) {
    progress = fromTop / visibleHeight
  }

  return {
    top,
    progress,
  }
}

const getBackgroundImageUrl = (path) => getCmsImageUrl({ path, ...backgroundImageSize })


export default function useSectionBackground(path) {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(() => getBackgroundImageUrl(path))
  const { isLoaded, error } = useImagePreload(backgroundImageUrl)

  useEffect(() => {
    if (error) {
      console.warn(`Loading section background "${backgroundImageUrl}" failed. Using fallback image "${config.fallbackCoverPath}".`)
      setBackgroundImageUrl(
        getBackgroundImageUrl(config.fallbackCoverPath)
      )
    }
  }, [error])

  const sectionRef = useRef()
  const [positions, setPositions] = useState(-1)
  useOnScroll((event) => {
    const newPositions = getPositions(event, sectionRef.current)
    if (!isEqual(positions, newPositions)) {
      setPositions(newPositions)
    }
  })

  return {
    backgroundImageUrl,
    isLoaded,
    sectionRef,
    ...positions,
  }
}
