import { h } from 'preact'
import { Link } from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'
import Logo from '../Logo'

import style from './style.css'


export default function Header({
  rootPage,
}) {
  const intl = useIntl()

  const isLoaded = rootPage && rootPage.childPages

  return (
    <header
      className={classnames(style.header, {
        [style.header_loaded]: isLoaded,
      })}
    >
      <nav
        className={style.nav}
      >
        <Link
          className={classnames(style.homeLink)}
          href="/"
        >
          <h1
            className={style.homeHeading}
          >
            <Logo
              aria-label="Home"
              className={style.homeLogo}
              small={true}
            />
          </h1>
        </Link>
        {isLoaded && filterPages(
          rootPage.childPages,
          { hidemenu: false }
        ).map((page) => {
          const href = getPageHref(page)
          return (
            <Link
              activeClassName={style.active}
              className={style.navLink}
              href={href}
            >
              {`${intl.getTranslatedAttribute(page, 'pagetitle')} `}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
