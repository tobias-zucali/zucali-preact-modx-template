import { h, Component } from 'preact'
import { Link, Router } from 'preact-router'

import Header from './header'

import usePageStructure from '../hooks/usePageStructure'


function getHref({
  alias,
  parentNodes = [],
}) {
  const aliases = [
    ...parentNodes.map((node) => node.alias),
    alias,
  ]
  return `/${aliases.join('/')}`
}

function SiteMap({ node }) {
  const {
    alias,
    parentNodes = [],
    pagetitle,
    childNodes = [],
  } = node
  return (
    <div>
      <Link
        href={getHref(node)}
      >{pagetitle}</Link>
      <ul>
        {childNodes.map((child) => (
          <SiteMap
            node={{
              ...child,
              parentNodes: [
                ...parentNodes,
                node,
              ],
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  const rootNode = usePageStructure()

  if (rootNode) {
    console.log({ rootNode })
  }

  return (
    <div id="app">
      {rootNode ? (
        <SiteMap
          node={rootNode}
        />
      ) : 'loading'}
    </div>
  )
}

/*
<Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
        </Router>

*/
