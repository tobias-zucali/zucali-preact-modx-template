import { h } from 'preact'
import { Link } from 'preact-router/match'

import usePage from '../../hooks/usePage'
import useIntl from '../../hooks/useIntl'

import getNodeHref from '../../utils/getNodeHref'
import Logo from '../Logo'

import style from './style.css'


export default function Header({
  rootNode,
}) {
  const rootPage = (rootNode && usePage(rootNode)) || rootNode
  const { childNodes = [] } = rootPage || {}
  const visibleChildNodes = childNodes.filter(
    ({ published, hidemenu }) => published && !hidemenu
  )
  const intl = useIntl()

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
            {
              alias: node.alias,
            },
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
              {intl.getTranslatedAttribute(node, 'pagetitle')}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
