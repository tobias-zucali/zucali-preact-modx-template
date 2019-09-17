// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage


// Mocks localStorage
const localStorageMock = (() => {
  let store = {}

  return {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
