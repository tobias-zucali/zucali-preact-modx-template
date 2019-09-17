export default function getNodeHref({
  alias,
  parentNodes = [],
}) {
  const aliases = [
    ...parentNodes.map((node) => node.alias),
    alias,
  ]
  return `/${aliases.join('/')}`
}
