import { useEffect, useState } from 'preact/hooks'
import debounce from 'lodash/debounce'


export const getCallbackArgs = () => ({
  windowHeight: window.document.scrollingElement.offsetHeight,
  scrollTop: window.document.scrollingElement.scrollTop,
  scrollLeft: window.document.scrollingElement.scrollLeft,
})

let callbacks = []
window.addEventListener('scroll', debounce(async () => {
  const args = getCallbackArgs()
  callbacks.forEach((callback) => {
    callback(args)
  })
}), 100)

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
