import { useEffect, useState } from 'preact/hooks'
import getResources from '../../utils/getResources'

import { ROOT_ID } from '../../constants'


export default function usePageStructure() {
  const [pageStructure, setPageStructure] = useState()
  useEffect(async () => {
    const { results } = await getResources({ structureOnly: true })
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
    const resultsById = results.reduce((acc, entry) => ({
      ...acc,
      [entry.id]: entry,
    }), {})

    const recursiveGetEntryWithChildren = (entry) => {
      const childIds = allChildIds[entry.id] || []
      const childNodes = childIds.map(
        (childId) => recursiveGetEntryWithChildren(resultsById[childId])
      ).sort(
        (a, b) => a.menuindex - b.menuindex
      )
      return {
        ...entry,
        childNodes,
      }
    }

    setPageStructure(recursiveGetEntryWithChildren(resultsById[ROOT_ID]))
  }, [])
  return pageStructure
}
