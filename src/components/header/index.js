import { h } from 'preact'
import { Link } from 'preact-router/match'

import getNodeHref from '../../utils/getNodeHref'
import Logo from '../Logo'

import style from './style.css'


export default function Header({
  rootNode = {},
}) {
  const { childNodes = [] } = rootNode
  const visibleChildNodes = childNodes.filter(
    ({ published, hidemenu }) => published && !hidemenu
  )
  return (
    <header className={style.header}>
      <nav>
        <Link href="/">
          <h1>
            <Logo
              aria-label="Home"
            />
          </h1>
        </Link>
        {visibleChildNodes.map((node) => {
          const href = getNodeHref(
            { alias: node.alias },
            {
              ignoreParents: true,
              isAnchor: true,
            }
          )
          return (
            <Link
              activeClassName={style.active}
              href={href}
            >
              {node.pagetitle}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
