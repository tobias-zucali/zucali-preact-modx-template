import isNil from 'lodash/isNil'

export default function filterPages(
  pages = [],
  filters = {}
) {
  const {
    published = true,
    hasChildren,
    ...otherFilters
  } = filters
  return pages.filter(
    (page) => {
      if (!isNil(published) && page.published !== published) {
        return false
      }
      if (!isNil(hasChildren)) {
        if (hasChildren && page.childPages.length === 0) {
          return false
        }
        if (!hasChildren && page.childPages.length > 0) {
          return false
        }
      }
      return Object.keys(otherFilters).every(
        (filterKey) => page[filterKey] === filters[filterKey]
      )
    }
  )
}
