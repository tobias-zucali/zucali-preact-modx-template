import { h } from 'preact'
import { Router } from 'preact-router'
import Match from 'preact-router/match'

import getNodeHref from '../../utils/getNodeHref'
import usePageStructure from '../../hooks/usePageStructure'
import Main from '../../containers/Main'
import SiteMap from '../SiteMap'


export default function App() {
  const rootNode = usePageStructure()

  if (rootNode) {
    console.log({ rootNode })
  }

  return (
    <div id="app">
      <Match path="/">
        { ({ matches, path, url }) => (
          <pre>{JSON.stringify(matches)}</pre>
        ) }
      </Match>
      <Router>
        {rootNode ? rootNode.childNodes.map((node) => [
          <Main
            key={getNodeHref(node)}
            node={node}
            path={getNodeHref(node)}
          />,
        ]) : null}
      </Router>
      {rootNode ? (
        <SiteMap
          node={rootNode}
        />
      ) : 'loading'}
    </div>
  )
}
