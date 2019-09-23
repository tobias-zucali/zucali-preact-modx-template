import { useEffect } from 'preact/hooks'


const IS_BROWSER = (typeof window !== 'undefined')

const scrollingElement = IS_BROWSER ? window.document.scrollingElement : {}

export const getCallbackArgs = () => ({
  windowHeight: scrollingElement.offsetHeight || 0,
  scrollTop: scrollingElement.scrollTop || 0,
  scrollLeft: scrollingElement.scrollLeft || 0,
})

let callbacks = []
if (IS_BROWSER) {
  let isFrameRequested = false
  const requestFrame = () => {
    window.requestAnimationFrame(() => {
      const args = getCallbackArgs()
      callbacks.forEach((callback) => {
        callback(args)
      })
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
