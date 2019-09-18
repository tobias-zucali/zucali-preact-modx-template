import { useEffect, useState } from 'preact/hooks'
import getResources from '../../utils/getResources'


const pageCache = {}

export default function usePage({
  id,
  childNodes,
}) {
  const [page, setPage] = useState(pageCache[id])
  useEffect(async () => {
    if (page && page.childNodes) {
      return
    }
    const [
      pageResult,
      ...childNodesResults
    ] = await Promise.all([
      getResources({ id }),
      ...childNodes.map((childNode) => getResources({ id: childNode.id })),
    ])
    const pageWithChildren = {
      ...pageResult.object,
      childNodes: childNodesResults.map(({ object }) => object),
    }
    pageCache[id] = pageWithChildren
    setPage(pageWithChildren)
  }, [id])
  return page
}
