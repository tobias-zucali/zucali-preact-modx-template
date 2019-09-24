import { h } from 'preact'
import { Link } from 'preact-router'
import Match from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'
import usePages from '../../hooks/usePages'
import useIsScrolledToTop from '../../hooks/useIsScrolledToTop'

import filterPages from '../../utils/filterPages'

import Logo from '../Logo'
import PageMenu from '../PageMenu'

import style from './style.scss'


const NavListEntry = ({
  className,
  href,
  isBreadCrumb,
  ...otherProps
}) => (
  <Match path={href}>
    {({ matches, path, url }) => {
      const isParent = !matches && path.startsWith(href)
      return (
        <li
          className={classnames(className, style.navListEntry)}
        >
          <Link
            className={classnames(style.navListEntryLink, {
              [style.navListEntryLink_isActive]: matches,
            })}
            href={href}
            {...otherProps}
          />
          {isBreadCrumb && '>'}
        </li>)
    }}
  </Match>
)

export default function Header() {
  const intl = useIntl()
  const {
    rootPage,
    currentPage,
  } = usePages()
  const isScrolledToTop = useIsScrolledToTop()
  const isLoaded = rootPage && rootPage.childPages
  const isRoot = rootPage.id === currentPage.id

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
      <PageMenu
        rootPage={rootPage}
      />
      <nav
        aria-label={intl.get('mainNav')}
        className={style.mainNav}
      >
        <ul
          className={style.navList}
        >
          {isLoaded && isRoot && filterPages(rootPage.childPages, {
            hasChildren: true,
            hidemenu: false,
          }).map((page) => (
            <NavListEntry
              href={page.href}
              key={page.href}
            >
              {`${page.menutitle || intl.getTranslatedAttribute(page, 'pagetitle')} `}
            </NavListEntry>
          ))}
          {isLoaded && !isRoot && [
            ...currentPage.parentPages,
            currentPage,
          ].map((page, index) => (
            <NavListEntry
              href={page.href}
              isBreadCrumb={index < currentPage.parentPages.length}
              key={page.href}
            >
              {`${page.menutitle || intl.getTranslatedAttribute(page, 'pagetitle')} `}
            </NavListEntry>
          ))}
        </ul>
      </nav>
    </header>
  )
}
