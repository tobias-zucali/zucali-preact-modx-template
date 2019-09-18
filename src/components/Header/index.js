import { h } from 'preact'
import { Link } from 'preact-router/match'

import useIntl from '../../hooks/useIntl'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'
import Logo from '../Logo'

import style from './style.css'


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
        {filterPages(
          rootPage && rootPage.childPages,
          { hidemenu: false }
        ).map((page) => {
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
