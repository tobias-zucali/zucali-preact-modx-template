import isNumber from 'lodash/isNumber'

import getPageHref from '../../utils/getPageHref'
import fixResourcesAlias from '../../utils/fixResourcesAlias'
import config from '../../config'


export const getResourcesById = (resources) => fixResourcesAlias(resources).reduce((acc, page) => ({
  ...acc,
  [page.id]: page,
}), {})

export const parseIdString = (idString = '') => idString.split('|').map(
  (stringPart) => parseInt(stringPart, 10)
).filter(
  (id) => !Number.isNaN(id)
)

export const getAllChildIds = (resourcesById) => {
  const regularChildIds = Object.values(resourcesById).reduce((acc, {
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

  // return regularChildIds

  const instrumentFolderChildIds = regularChildIds[config.instrumentsFolderId]
  const instrumentChildIds = instrumentFolderChildIds.reduce(
    (acc, instrumentPageId) => {
      const instrumentParents = parseIdString(resourcesById[instrumentPageId].tags)

      return instrumentParents.reduce((instrumentAcc, instrumentParent) => ({
        ...instrumentAcc,
        [instrumentParent]: [
          ...(instrumentAcc[instrumentParent] || []),
          instrumentPageId,
        ],
      }), acc)
    },
    {}
  )

  return {
    ...regularChildIds,
    ...instrumentChildIds,
  }
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
  const resourcesById = getResourcesById(resources)
  const allChildIds = getAllChildIds(resourcesById)

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
