import { useEffect, useState } from 'preact/hooks'
import getResources from '../../utils/getResources'

import { ROOT_ID } from '../../constants'


export default function usePageStructure() {
  const [pageStructure, setPageStructure] = useState()
  useEffect(async () => {
    const { results } = await getResources({ structureOnly: true })
    const childIds = results.reduce((acc, {
      contentType, deleted, id, parent,
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
      const children = childIds[entry.id].map(
        (childId) => resultsById[childId]
      ).sort(
        (a, b) => a.menuindex - b.menuindex
      )
      return {
        ...entry,
        children,
      }
    }

    setPageStructure(recursiveGetEntryWithChildren(resultsById[ROOT_ID]))
  }, [])
  return pageStructure
}
