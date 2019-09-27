import { useEffect, useState } from 'preact/hooks'

import isBrowser from '../../utils/isBrowser'

import getResources from './getResources'
import prepareResources from './prepareResources'


const preloadedResults = (isBrowser && window.ZUCALI_RESOURCES)
  ? prepareResources(window.ZUCALI_RESOURCES)
  : undefined

export default function useRootPage() {
  const [pageStructure, setPageStructure] = useState(preloadedResults)

  useEffect(async () => {
    if (!preloadedResults) {
      const results = await getResources()
      setPageStructure(prepareResources(results))
    }
  }, [])
  return pageStructure
}
