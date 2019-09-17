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
    const resultsById = results.reduce((acc, node) => ({
      ...acc,
      [node.id]: node,
    }), {})

    const recursiveGetNodeWithChildren = (node, parentNodes = []) => {
      const childIds = allChildIds[node.id] || []
      const childNodes = childIds.map(
        (childId) => recursiveGetNodeWithChildren(resultsById[childId], [
          ...parentNodes,
          node,
        ])
      ).sort(
        (a, b) => a.menuindex - b.menuindex
      )
      return {
        ...node,
        childNodes,
        parentNodes,
      }
    }

    setPageStructure(recursiveGetNodeWithChildren(resultsById[ROOT_ID]))
  }, [])
  return pageStructure
}
