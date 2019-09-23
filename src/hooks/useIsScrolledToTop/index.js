import { useState } from 'preact/hooks'

import useOnScroll, { getCallbackArgs } from '../useOnScroll'


const GAP = 100
const checkIsTop = ({ scrollTop }) => scrollTop <= GAP

export default function useIsScrolledToTop(path) {
  const [isTop, setIsTop] = useState(() => checkIsTop(getCallbackArgs()))
  useOnScroll((event) => {
    const newIsTop = checkIsTop(event)
    if (isTop !== newIsTop) {
      setIsTop(newIsTop)
    }
  })
  return isTop
}
