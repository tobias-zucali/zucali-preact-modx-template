import { useEffect, useState } from 'preact/hooks'


const loadedImages = {}

export default function useImagePreload(src) {
  const [isLoaded, setIsLoaded] = useState(!!loadedImages[src])
  useEffect(() => {
    if (!isLoaded) {
      const image = new Image()
      image.onload = () => {
        image.onload = null
        loadedImages[src] = true
        setIsLoaded(true)
      }
      image.src = src
    }
  }, [])
  return isLoaded
}
