export default function getPageHref({
  alias,
  parentPages = [],
}, {
  ignoreParents = false,
  isAnchor = false,
} = {}) {
  const parentPath = ignoreParents ? '/' : `/${parentPages.map((page) => page.alias).join('/')}`
  return parentPath + (isAnchor ? '#' : '/') + alias
}
