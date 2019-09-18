import { h } from 'preact'
import { useRef, useState } from 'preact/hooks'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'
import useScrollCallback from '../../hooks/useScrollCallback'
import getCmsImageUrl from '../../utils/getCmsImageUrl'

// import CmsImage from '../CmsImage'

import style from './style.css'


const BACKGROUND_MARGIN = 100
const SCROLL_POSITION_GAP = 0.5

const getElementScrollPosition = (event, domNode) => {
  const {
    windowHeight,
    scrollTop: viewportTop,
  } = event
  const viewportBottom = viewportTop + windowHeight

  const {
    offsetTop,
    offsetHeight,
  } = domNode
  const offsetBottom = offsetTop + offsetHeight + windowHeight
  const visibleHeight = offsetHeight + windowHeight

  const visibility = (viewportBottom - offsetTop - windowHeight) / visibleHeight
  if (visibility < 0 - SCROLL_POSITION_GAP) {
    return 0 - SCROLL_POSITION_GAP
  } else if (visibility > SCROLL_POSITION_GAP + 1) {
    return SCROLL_POSITION_GAP + 1
  } else {
    return visibility
  }
}

export default function Section({
  data,
}) {
  const sectionElement = useRef()
  const [scrollPosition, setScrollPosition] = useState(0)
  useScrollCallback((event) => {
    const newScrollPosition = getElementScrollPosition(event, sectionElement.current)
    if (scrollPosition !== newScrollPosition) {
      setScrollPosition(newScrollPosition)
    }
  })

  const intl = useIntl()
  const isVisible = scrollPosition > 0 && scrollPosition < 1
  const backgroundTopOffset = (scrollPosition + SCROLL_POSITION_GAP) * BACKGROUND_MARGIN
  const backgroundSideOffset = ((1 + SCROLL_POSITION_GAP - scrollPosition) * BACKGROUND_MARGIN) / 2

  return (
    <div
      className={style.section}
      ref={sectionElement}
    >
      <div className={style.foreground}>
        <h2>{intl.getTranslatedAttribute(data, 'pagetitle')}</h2>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: intl.getTranslatedAttribute(data, 'content') }}
        />
      </div>
      <div className={style.background}>
        <div
          className={classnames(style.backgroundImage, {
            [style.backgroundImage_hidden]: !isVisible,
          })}
          style={`
            background-image: url(${getCmsImageUrl({ path: data.cover })});
            margin-top: ${backgroundTopOffset * -1}px;
            margin-left: ${backgroundSideOffset * -1}px;
          `}
        />
      </div>
    </div>
  )
}
