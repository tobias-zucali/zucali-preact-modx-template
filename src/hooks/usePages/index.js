import { useEffect, useState } from 'preact/hooks'
import getResources from '../../utils/getResources'

import { ROOT_ID } from '../../constants'


export default function usePages() {
  const [pageStructure, setPageStructure] = useState()
  useEffect(async () => {
    const { results } = await getResources()
    const allChildIds = results.reduce((acc, {
      deleted,
      id,
      parent,
    }) => {
      if (deleted) {
        return acc
      }
      return {
        ...acc,
        [parent]: [
          ...(acc[parent] || []),
          id,
        ],
      }
    }, {})
    const resultsById = results.reduce((acc, page) => ({
      ...acc,
      [page.id]: page,
    }), {})

    const recursiveGetPageWithChildren = (page, parentPages = []) => {
      const childIds = allChildIds[page.id] || []
      const childPages = childIds.map(
        (childId) => recursiveGetPageWithChildren(resultsById[childId], [
          ...parentPages,
          page,
        ])
      ).sort(
        (a, b) => a.menuindex - b.menuindex
      )
      return {
        ...page,
        childPages,
        parentPages,
      }
    }

    setPageStructure(recursiveGetPageWithChildren(resultsById[ROOT_ID]))
  }, [])
  return pageStructure
}
