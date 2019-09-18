import { h } from 'preact'
import { Link } from 'preact-router/match'

import usePage from '../../hooks/usePage'
import useIntl from '../../hooks/useIntl'

import getPageHref from '../../utils/getPageHref'
import Logo from '../Logo'

import style from './style.css'


export default function Header({
  rootPage,
}) {
  const rootPage = (rootPage && usePage(rootPage)) || rootPage
  const { childPages = [] } = rootPage || {}
  const visibleChildPages = childPages.filter(
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
        {visibleChildPages.map((page) => {
          const href = getPageHref(
            {
              alias: page.alias,
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
              {intl.getTranslatedAttribute(page, 'pagetitle')}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
