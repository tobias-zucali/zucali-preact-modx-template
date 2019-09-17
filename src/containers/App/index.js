import { h } from 'preact'
import { route, Router } from 'preact-router'

import getNodeHref from '../../utils/getNodeHref'
import usePageStructure from '../../hooks/usePageStructure'
import Todo from '../Todo'
import SiteMap from '../../components/SiteMap'


const htmlUrlExp = /([^#?]*)(\.html?)(($|\?|#).*)/i
const redirectHtmlUrls = ({ url }) => {
  const urlWithoutExtension = url.replace(htmlUrlExp, '$1$3')
  if (url !== urlWithoutExtension) {
    route(urlWithoutExtension, true)
  }
}

export default function App() {
  const rootNode = usePageStructure()

  if (rootNode) {
    console.log({ rootNode })
  }

  return (
    <div id="app">
      {rootNode ? [
        <Router
          key="router"
          onChange={redirectHtmlUrls}
        >
          {rootNode.childNodes.map((node) => {
            const href = getNodeHref(node)
            const redirectHref = `${href}.html`
            return (
              <Todo
                key={href}
                node={node}
                path={href}
              />
            )
          })}
          <Todo
            default
            node={rootNode}
          />
        </Router>,
        <SiteMap
          key="sitemap"
          node={rootNode}
        />,
      ] : 'loading'}
    </div>
  )
}
