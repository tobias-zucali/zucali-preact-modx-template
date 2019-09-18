import { h } from 'preact'

import SiteMap from '../../components/SiteMap'


export default function Todo({
  node,
  rootNode,
}) {
  return (
    <div>
      <h2>Todo: {node.pagetitle}</h2>
      <SiteMap
        key="sitemap"
        node={rootNode}
      />
    </div>
  )
}
