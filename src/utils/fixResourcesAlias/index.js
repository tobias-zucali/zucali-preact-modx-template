const replacements = [
  ['ä', 'ae'],
  ['ü', 'ue'],
  ['ö', 'oe'],
  ['ß', 'sz'],
  ['Ä', 'AE'],
  ['Ü', 'UE'],
  ['Ö', 'OE'],
  ['SS', 'SZ'],
  ['SS', 'SZ'],
  [/\W/g, '-'],
]


export default function fixResourcesAlias(resources) {
  const fixAlias = (alias) => {
    const fixedAlias = replacements.reduce(
      (acc, replacement) => acc.replace(...replacement),
      alias
    )
    return fixedAlias
  }

  return resources.map(({ alias, ...page }) => ({
    ...page,
    alias: fixAlias(alias),
  }))
}
