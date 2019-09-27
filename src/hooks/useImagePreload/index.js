import { useEffect, useState } from 'preact/hooks'


const loadedImages = {}

export default function useImagePreload(src) {
  const [isLoaded, setIsLoaded] = useState(loadedImages[src] || false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!loadedImages[src]) {
      // update isLoaded in case of changing src
      if (isLoaded) {
        setIsLoaded(false)
      }
      let image = new Image()
      const cleanup = () => {
        image.onload = null
        image.onerror = null
        image = null
      }
      image.onload = () => {
        loadedImages[src] = true
        setIsLoaded(true)
        cleanup()
      }
      image.onerror = (e) => {
        setError(e)
        cleanup()
      }
      image.src = src
    }
  }, [src])
  return { isLoaded, error }
}
