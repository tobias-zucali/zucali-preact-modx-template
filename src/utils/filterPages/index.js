export default function filterPages(pages = [], filters = {}) {
  return pages.filter(
    // TODO: add url parameter to show unpublished content
    (page) => page.published && Object.keys(filters).every(
      (filterKey) => page[filterKey] === filters[filterKey]
    )
  )
}
