import { useEffect, useState } from 'preact/hooks'
import debounce from 'lodash/debounce'


const IS_BROWSER = (typeof window !== 'undefined')

const scrollingElement = IS_BROWSER ? window.document.scrollingElement : {}

export const getCallbackArgs = () => ({
  windowHeight: scrollingElement.offsetHeight || 0,
  scrollTop: scrollingElement.scrollTop || 0,
  scrollLeft: scrollingElement.scrollLeft || 0,
})

let callbacks = []
if (IS_BROWSER) {
  window.addEventListener('scroll', debounce(async () => {
    const args = getCallbackArgs()
    callbacks.forEach((callback) => {
      callback(args)
    })
  }), 100)
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
