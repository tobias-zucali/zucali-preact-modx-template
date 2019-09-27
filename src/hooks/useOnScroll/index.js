import { useEffect } from 'preact/hooks'

import isBrowser from '../../utils/isBrowser'


const scrollingElement = isBrowser ? window.document.scrollingElement : {}

export const getCallbackArgs = () => ({
  windowHeight: scrollingElement.offsetHeight || 0,
  scrollTop: scrollingElement.scrollTop || 0,
  scrollLeft: scrollingElement.scrollLeft || 0,
})

let callbacks = []
const executeCallbacks = () => {
  const args = getCallbackArgs()
  callbacks.forEach((callback) => {
    callback(args)
  })
}
if (isBrowser) {
  let isFrameRequested = false
  const requestFrame = () => {
    window.requestAnimationFrame(() => {
      executeCallbacks()
      isFrameRequested = false
    })
    isFrameRequested = true
  }

  window.addEventListener(
    'scroll',
    () => !isFrameRequested && requestFrame()
  )
}

export default function useOnScroll(callback) {
  useEffect(() => {
    callbacks = [
      ...callbacks,
      callback,
    ]

    // initial call
    callback(getCallbackArgs())

    return function cleanup() {
      callbacks = callbacks.filter(
        (entry) => entry !== callback
      )
    }
  }, [callback])
}
