import { h } from 'preact'
import { Link } from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'
import useIsScrolledToTop from '../../hooks/useIsScrolledToTop'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'
import Logo from '../Logo'

import style from './style.css'


export default function Header({
  rootPage,
}) {
  const isTop = useIsScrolledToTop()
  const intl = useIntl()

  return (
    <header
      className={classnames(style.header, {
        [style.header_small]: !isTop,
      })}
    >
      <Link
        aria-hidden="true"
        className={style.logoLink}
        href="/"
        tabIndex="-1"
      >
        <Logo
          aria-label="Home"
          className={style.logo}
        />
      </Link>
      <nav
        className={style.nav}
      >
        <Link
          className={classnames(style.homeLink, {
            [style.homeLink_isHidden]: isTop,
          })}
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
        {filterPages(
          rootPage && rootPage.childPages,
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
