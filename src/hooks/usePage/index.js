import { useEffect, useState } from 'preact/hooks'
import getResources from '../../utils/getResources'


const pageCache = {}

export default function usePage({
  id,
  childPages,
}) {
  const [page, setPage] = useState(pageCache[id])
  useEffect(async () => {
    if (page && page.childPages) {
      return
    }
    const [
      pageResult,
      ...childPagesResults
    ] = await Promise.all([
      getResources({ id }),
      ...childPages.map((childPage) => getResources({ id: childPage.id })),
    ])
    const pageWithChildren = {
      ...pageResult.object,
      childPages: childPagesResults.map(({ object }) => object),
    }
    pageCache[id] = pageWithChildren
    setPage(pageWithChildren)
  }, [id])
  return page
}
