import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'
import useId from '../../hooks/useId'
import useIsScrolledToTop from '../../hooks/useIsScrolledToTop'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'

import Hamburger from '../Hamburger'
import Logo from '../Logo'

import style from './style.scss'


export default function Header({
  rootPage,
}) {
  const intl = useIntl()
  const menuId = useId()
  const hamburgerId = useId()
  const isScrolledToTop = useIsScrolledToTop()
  const [isMenuOpen, setMenuOpen] = useState(false)

  const isLoaded = rootPage && rootPage.childPages

  return (
    <header>
      <div className={style.background} />

      <h1 className={classnames(style.heading, {
        [style.heading_isHidden]: !isScrolledToTop,
      })} >
      <Logo
          aria-label={intl.get('pageTitle')}
          className={style.headingLogo}
        small={false}
      />
      </h1>
      <nav
        aria-label={intl.get('mainNav')}
        className={classnames(style.header, {
          [style.header_isVisible]: isLoaded,
          [style.header_isMenuOpen]: isMenuOpen,
        })}
      >
        <Hamburger
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-label={intl.get('menu')}
          className={style.hamburger}
          id={hamburgerId}
          isOpen={isMenuOpen}
          onClick={() => setMenuOpen(!isMenuOpen)}
          role="button"
        />
        <ul
          aria-labelledby={hamburgerId}
          className={classnames(style.menu, {
            [style.menu_isOpen]: isMenuOpen,
          })}
          id={menuId}
          role="menu"
        >
          <li
            className={style.menuEntry}
          >
            <Link
              className={classnames(style.homeLink)}
              href="/"
            >
                <Logo
                aria-label={intl.get('home')}
                  className={style.homeLogo}
                  small={true}
                />
                <span
                  className={style.homeText}
                >
                  Home
                </span>
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
