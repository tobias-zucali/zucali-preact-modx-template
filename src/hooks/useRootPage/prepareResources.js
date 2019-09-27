import getPageHref from '../../utils/getPageHref'
import fixResourcesAlias from '../../utils/fixResourcesAlias'
import config from '../../config'


export default function prepareResources(resources) {
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
