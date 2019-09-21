import { useEffect, useState } from 'preact/hooks'

import { Host, ROOT_ID } from '../../constants'


const IS_BROWSER = (typeof window !== 'undefined')

// Requesting resources via XMLHttpRequest is only used for "npm run serve".
const getResources = () => new Promise((resolve, reject) => {
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
})

const prepareResources = (resources) => {
  const allChildIds = resources.reduce((acc, {
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
  const resourcesById = resources.reduce((acc, page) => ({
    ...acc,
    [page.id]: page,
  }), {})

  const recursiveGetPageWithChildren = (page, parentPages = []) => {
    const childIds = allChildIds[page.id] || []
    const childPages = childIds.map(
      (childId) => recursiveGetPageWithChildren(resourcesById[childId], [
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

  return recursiveGetPageWithChildren(resourcesById[ROOT_ID])
}

const preloadedResults = (IS_BROWSER && window.ZUCALI_RESOURCES)
  ? prepareResources(window.ZUCALI_RESOURCES)
  : undefined

export default function useResources() {
  const [pageStructure, setPageStructure] = useState(preloadedResults)

  useEffect(async () => {
    if (!preloadedResults) {
      const results = await getResources()
      setPageStructure(prepareResources(results))
    }
  }, [])
  return pageStructure
}
