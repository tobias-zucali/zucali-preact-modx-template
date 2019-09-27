import { useEffect, useState } from 'preact/hooks'

import getPageHref from '../../utils/getPageHref'
import fixResourcesAlias from '../../utils/fixResourcesAlias'
import config from '../../config'


const IS_BROWSER = (typeof window !== 'undefined')

// Requesting resources via XMLHttpRequest is only used for "npm run serve".
const getResources = () => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    `${config.host.BASE}/resources.json`,
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
    // TODO: fix nesting of instruments
    if (deleted || id === config.instrumentsFolderId) {
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
  const resourcesFixedAlias = fixResourcesAlias(resources)
  const resourcesById = resourcesFixedAlias.reduce((acc, page) => ({
    ...acc,
    [page.id]: page,
  }), {})

  const recursiveGetPageWithChildren = (page, parentPages = []) => {
    const pageWithParents = {
      ...page,
      parentPages,
    }
    const pageWithHref = pageWithParents.href ? pageWithParents : {
      ...pageWithParents,
      href: getPageHref(pageWithParents),
    }

    const childIds = allChildIds[pageWithHref.id] || []
    const childParents = [
      ...parentPages,
      pageWithHref,
    ]
    const childPages = childIds.map(
      (childId) => recursiveGetPageWithChildren(resourcesById[childId], childParents)
    ).sort(
      (a, b) => a.menuindex - b.menuindex
    )
    return {
      ...pageWithHref,
      childPages,
    }
  }

  return recursiveGetPageWithChildren({
    ...resourcesById[config.rootId],
    href: '/',
  })
}

const preloadedResults = (IS_BROWSER && window.ZUCALI_RESOURCES)
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
