import { useEffect, useState } from 'preact/hooks'
import memoize from 'lodash/memoize'

import { Host, ROOT_ID } from '../../constants'


const getResources = memoize(({
  id,
  structureOnly,
  limit = 99999,
} = {}) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    `${Host.BASE}/resources.json`,
    true
  )
  xhr.responseType = 'json'

  xhr.onload = () => {
    const { status } = xhr

    if (status === 200) {
      resolve(xhr.response)
    } else {
      reject(
        Error(`getResources failed with status ${status}`)
      )
    }
  }

  xhr.send()
}))

export default function usePages() {
  const [pageStructure, setPageStructure] = useState()
  useEffect(async () => {
    const results = await getResources()
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
