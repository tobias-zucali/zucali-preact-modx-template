import { useEffect, useState } from 'preact/hooks'
import getResources from '../../utils/getResources'


const pageCache = {}

export default function usePage({
  id,
  childNodes,
}, {
  includeChildNodes,
} = {}) {
  const [page, setPage] = useState(pageCache[id])
  useEffect(async () => {
    if (page) {
      return
    }
    const result = await getResources({ id })
    const { object } = result
    pageCache[id] = object
    setPage(object)
  }, [id])
  return page
}
