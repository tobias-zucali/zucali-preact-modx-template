import { h } from 'preact'
import { Link, Router } from 'preact-router'
import Match from 'preact-router/match'

import Header from './header'

import usePageStructure from '../hooks/usePageStructure'
import Main from '../containers/Main'


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
            node={child}
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
      <Match path="/">
        { ({ matches, path, url }) => (
          <pre>{JSON.stringify(matches)}</pre>
        ) }
      </Match>
      <Router>
        {rootNode ? rootNode.childNodes.map((node) => (
          <Main
            node={node}
            path={getHref({
              ...node,
              // parentNodes: [rootNode],
            })}
          />
        )) : null}
        {rootNode ? rootNode.childNodes.map((node) => (
          <Main
            node={node}
            path={getHref({
              ...node,
              // parentNodes: [rootNode],
            })}
          />
        )) : null}
      </Router>
      {rootNode ? (
        <SiteMap
          node={rootNode}
        />
      ) : 'loading'}
    </div>
  )
}
