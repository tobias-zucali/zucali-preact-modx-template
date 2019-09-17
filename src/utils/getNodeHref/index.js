export default function getNodeHref({
  alias,
  parentNodes = [],
}, {
  ignoreParents = false,
  isAnchor = false,
} = {}) {
  const parentPath = ignoreParents ? '/' : `/${parentNodes.map((node) => node.alias).join('/')}`
  return parentPath + (isAnchor ? '#' : '/') + alias
}
