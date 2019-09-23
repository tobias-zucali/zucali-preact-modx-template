import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router'
import Match from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'
import useId from '../../hooks/useId'
import useIsScrolledToTop from '../../hooks/useIsScrolledToTop'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'

import Hamburger from '../Hamburger'
import Logo from '../Logo'
import PageMenu from '../PageMenu'

import style from './style.scss'


const NavListEntry = ({
  className,
  href,
  ...otherProps
}) => (
  <Match path={href}>
    {({ matches, path, url }) => {
      const isParent = !matches && path.startsWith(href)
      return (
        <li
          className={classnames(className, style.navListEntry, {
            [style.navListEntry_isActive]: matches,
            [style.navListEntry_isParent]: isParent,
          })}
        >
          <Link
            className={style.navListEntryLink}
            href={href}
            {...otherProps}
          />
        </li>)
    }}
  </Match>
)

export default function Header({
  rootPage,
}) {
  const intl = useIntl()
  const menuId = useId()
  const hamburgerId = useId()
  const isScrolledToTop = useIsScrolledToTop()
  const [isMenuOpen, setMenuOpen] = useState(false)
  // const [isMenuOpen, setMenuOpen] = useState(true)

  const isLoaded = rootPage && rootPage.childPages

  return (
    <header>
      <div className={style.background} />

      <h1 className={classnames(style.heading, {
        [style.heading_isHidden]: !isScrolledToTop,
      })} >
        <Link
          href="/"
          className={style.headingLink}
        >
          <Logo
            aria-label={intl.get('pageTitle')}
            className={style.headingLogo}
            small={false}
          />
        </Link>
      </h1>
      <button
        className={style.menuButton}
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
        id={hamburgerId}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <Hamburger
          aria-label={intl.get('menu')}
          className={style.hamburger}
          isOpen={isMenuOpen}
        />
      </button>
      <PageMenu
        aria-labelledby={hamburgerId}
        id={menuId}
        isOpen={isMenuOpen}
        rootPage={rootPage}
      />
      <nav
        aria-label={intl.get('mainNav')}
        className={style.mainNav}
      >
        <ul
          className={style.navList}
        >
          {isLoaded && filterPages(rootPage.childPages, {
            hasChildren: true,
            hidemenu: false,
          }).map((page) => {
            const href = getPageHref(page)
            return (
              <NavListEntry
                href={href}
                key={href}
              >
                {`${intl.getTranslatedAttribute(page, 'pagetitle')} `}
              </NavListEntry>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
