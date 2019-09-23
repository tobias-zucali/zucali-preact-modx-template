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

import style from './style.scss'


const MenuListEntry = ({
  className,
  href,
  ...otherProps
}) => (
  <Match path={href}>
    {({ matches, path, url }) => {
      const isParent = !matches && path.startsWith(href)
      return (
        <li
          className={classnames(className, style.menuEntry, {
            [style.menuEntry_isActive]: matches,
            [style.menuEntry_isParent]: isParent,
          })}
        >
          <Link
            className={style.menuEntryLink}
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
          <MenuListEntry
            href="/"
            key="/"
          >
            {intl.get('home')}
          </MenuListEntry>
          {isLoaded && filterPages(
            rootPage.childPages,
            { hidemenu: false }
          ).map((page) => {
            const href = getPageHref(page)
            return (
              <MenuListEntry
                href={href}
                key={href}
              >
                {`${intl.getTranslatedAttribute(page, 'pagetitle')} `}
              </MenuListEntry>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
