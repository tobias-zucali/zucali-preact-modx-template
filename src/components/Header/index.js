import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'

import Hamburger from '../Hamburger'
import Logo from '../Logo'

import style from './style.css'


export default function Header({
  rootPage,
}) {
  const intl = useIntl()
  const [isMenuOpen, setMenuOpen] = useState(false)

  const isLoaded = rootPage && rootPage.childPages

  return (
    <header
      className={classnames(style.header, {
        [style.header_loaded]: isLoaded,
      })}
    >
      <nav>
        {/* <Hamburger
          className={style.hamburger}
          isOpen={() => isMenuOpen}
          onClick={() => setMenuOpen(!isMenuOpen)}
        /> */}
        <ul
          className={style.menu}
        >
          <li
            className={style.menuEntry}
          >
            <Link
              className={classnames(style.homeLink)}
              href="/"
            >
              <h1
                className={style.homeHeading}
              >
                <Logo
                  aria-label="Home" // TODO: use Intl
                  className={style.homeLogo}
                  small={true}
                />
              </h1>
            </Link>
          </li>
          {isLoaded && filterPages(
            rootPage.childPages,
            { hidemenu: false }
          ).map((page) => {
            const href = getPageHref(page)
            return (
              <li
                className={style.menuEntry}
                key={href}
              >
                <Link
                  activeClassName={style.active}
                  className={style.menuEntryLink}
                  href={href}
                >
                  {`${intl.getTranslatedAttribute(page, 'pagetitle')} `}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
