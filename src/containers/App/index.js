import { h } from 'preact'
import { route, Router } from 'preact-router'

import getNodeHref from '../../utils/getNodeHref'
import useStructure from '../../hooks/useStructure'

import Todo from '../Todo'
import Home from '../Home'

import IntlProvider from '../../components/IntlProvider'
import Header from '../../components/Header'


const htmlUrlExp = /([^#?]*)(\.html?)(($|\?|#).*)/i
const redirectHtmlUrls = ({ url }) => {
  const urlWithoutExtension = url.replace(htmlUrlExp, '$1$3')
  if (url !== urlWithoutExtension) {
    route(urlWithoutExtension, true)
  }
}

export default function App() {
  const rootNode = useStructure()

  return (
    <IntlProvider
      locale="en"
    >
      <Header
        rootNode={rootNode}
      />
      {rootNode ? (
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
                rootNode={rootNode}
                path={href}
              />
            )
          })}
          <Home
            default
            node={rootNode}
          />
        </Router>
      ) : 'loading'}
    </IntlProvider>
  )
}
