import isNumber from 'lodash/isNumber'

import getPageHref from '../../utils/getPageHref'
import fixResourcesAlias from '../../utils/fixResourcesAlias'
import config from '../../config'


const getAllChildIds = (resources) => {
  const regularChildIds = resources.reduce((acc, {
    deleted,
    id,
    parent,
  }) => {
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

  // const allChildIds = regularChildIds[config.instrumentsFolderId].reduce(
  //   (acc, instrumentPageId) => {
  //     const instrumentResource = resources[instrumentPageId]
  //     if (!instrumentResource || !instrumentResource.tags) {
  //       return acc
  //     }
  //     const tags = instrumentResource.split('|').map(parseInt).filter(isNumber)
  //     const instrumentChildIds =

  //   },
  //   regularChildIds
  // )
  // return allChildIds
  return regularChildIds
}

const preparePage = ({ page, parentPages = [], childPages = [] }) => {
  const pageWithParents = {
    ...page,
    parentPages,
  }
  const pageWithHref = pageWithParents.href ? pageWithParents : {
    ...pageWithParents,
    href: getPageHref(pageWithParents),
  }

  return {
    ...pageWithHref,
    childPages,
  }
}


export default function prepareResources(resources) {
  const allChildIds = getAllChildIds(resources)
  const resourcesById = fixResourcesAlias(resources).reduce((acc, page) => ({
    ...acc,
    [page.id]: page,
  }), {})

  const recursiveGetPageWithChildren = (page, parentPages = []) => {
    const preparedPage = preparePage({ page, parentPages })
    const childIds = allChildIds[preparedPage.id] || []
    const childParents = [
      ...parentPages,
      preparedPage,
    ]
    const childPages = childIds.map(
      (childId) => recursiveGetPageWithChildren(resourcesById[childId], childParents)
    ).sort(
      (a, b) => a.menuindex - b.menuindex
    )

    preparedPage.childPages = childPages
    return preparedPage
  }

  // const instrumentsFolder = recursiveGetPageWithChildren(
  //   resourcesById[config.instrumentsFolderId]
  // )
  // instrumentsFolder.childPages.map((childPage) => {

  // })

  return recursiveGetPageWithChildren({
    ...resourcesById[config.rootId],
    href: '/',
  })
}
