import { h } from 'preact'
import { Link } from 'preact-router/match'

import useIntl from '../../hooks/useIntl'

import getPageHref from '../../utils/getPageHref'
import Logo from '../Logo'

import style from './style.css'


const getVisibleChildPages = (page) => {
  if (!page) {
    return []
  }
  const { childPages } = page
  return childPages.filter(
    ({ published, hidemenu }) => published && !hidemenu
  )
}

export default function Header({
  rootPage,
}) {
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
        {getVisibleChildPages(rootPage).map((page) => {
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
