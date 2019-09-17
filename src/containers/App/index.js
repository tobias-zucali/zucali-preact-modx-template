import { h } from 'preact'
import { route, Router } from 'preact-router'

import getNodeHref from '../../utils/getNodeHref'
import usePageStructure from '../../hooks/usePageStructure'

import Todo from '../Todo'
import Home from '../Home'

import Header from '../../components/Header'
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

  return (
    <div id="app">
      <Header
        rootNode={rootNode}
      />
      {rootNode ? [
        <Router
          key="router"
          onChange={redirectHtmlUrls}
        >
          {rootNode.childNodes.map((node) => {
            const href = getNodeHref(node)
            return (
              <Todo
                key={href}
                node={node}
                path={href}
              />
            )
          })}
          <Home
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
