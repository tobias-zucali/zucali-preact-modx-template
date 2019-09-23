import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router'
import Match from 'preact-router/match'
import classnames from 'classnames'

import Hamburger from '../Hamburger'

import useIntl from '../../hooks/useIntl'
import useId from '../../hooks/useId'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'

import style from './style.scss'


const MenuList = ({
  children,
  className,
  filters,
  isDisabled,
  isRecursive,
  onClick,
  parent,
  ...otherProps
}) => {
  const intl = useIntl()

  const listItems = filterPages(parent.childPages, filters).map((childPage) => {
    const href = getPageHref(childPage)
    return (
      <MenuListPageEntry
        href={href}
        isDisabled={isDisabled}
        isRecursive={isRecursive}
        key={href}
        onClick={onClick}
        page={childPage}
      >
        {`${intl.getTranslatedAttribute(childPage, 'pagetitle')} `}
      </MenuListPageEntry>
    )
  })

  return listItems.length > 0 || children ? (
    <ul
      className={classnames(className, style.menuList)}
      {...otherProps}
    >
      {children}
      {listItems}
    </ul>
  ) : null
}

const MenuListPageEntry = ({
  children,
  filters,
  href,
  isDisabled,
  isRecursive,
  onClick,
  page,
  ...otherProps
}) => (
  <MenuListEntry
    href={href}
    isDisabled={isDisabled}
    nestedMenu={isRecursive && (
      <MenuList
        filters={filters}
        isDisabled={isDisabled}
        isRecursive={isRecursive}
        onClick={onClick}
        parent={page}
      />
    )}
    onClick={onClick}
    {...otherProps}
  >
    {children}
  </MenuListEntry>
)

const MenuListEntry = ({
  children,
  className,
  href,
  isDisabled,
  isRecursive,
  nestedMenu,
  onClick,
  ...otherProps
}) => (
  <Match path={href}>
    {({ matches, path, url }) => {
      const isParent = !matches && path.startsWith(href)
      return (
        <li
          className={classnames(className, style.menuListEntry)}
          {...otherProps}
        >
          <Link
            className={classnames(style.menuListEntryLink, {
              [style.menuListEntryLink_isActive]: matches,
              [style.menuListEntryLink_isParent]: isParent,
            })}
            href={href}
            onClick={onClick}
            role="menuitem"
            tabIndex={isDisabled ? -1 : 0}
          >
            {children}
          </Link>
          {nestedMenu}
        </li>)
    }}
  </Match>
)

export default function PageMenu({
  rootPage,
}) {
  const intl = useIntl()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const hamburgerId = useId()

  const isLoaded = rootPage && rootPage.childPages
  const handleClick = () => setMenuOpen(false)

  return [
    <button
      className={style.menuButton}
      aria-controls={menuId}
      aria-expanded={isMenuOpen}
      aria-haspopup="true"
      id={hamburgerId}
      key="button"
      onClick={() => setMenuOpen(!isMenuOpen)}
    >
      <Hamburger
        aria-label={intl.get('menu')}
        className={style.hamburger}
        isOpen={isMenuOpen}
      />
    </button>,
    isLoaded ? (
      <div
        aria-disabled={!isMenuOpen}
        aria-labelledby={hamburgerId}
        className={classnames(style.menu, {
          [style.menu_isOpen]: isMenuOpen,
        })}
        id={menuId}
        isMenuOpen={isMenuOpen}
        key="menu"
        role="menu"
      >
        <div className={style.menuTopOverlay} />
        <MenuList
          className={style.menuList_paddingBottom}
          filters={{
            hasChildren: false,
          }}
          isDisabled={!isMenuOpen}
          isRecursive={true}
          onClick={handleClick}
          parent={rootPage}
        >
          <MenuListEntry
            href="/"
            onClick={handleClick}
          >
            TODO: switch language
          </MenuListEntry>
          <MenuListEntry
            href="/"
            onClick={handleClick}
          >
            {intl.get('home')}
          </MenuListEntry>
        </MenuList>
        <MenuList
          filters={{
            hasChildren: true,
          }}
          isDisabled={!isMenuOpen}
          isRecursive={true}
          onClick={handleClick}
          parent={rootPage}
        />
      </div>
    ) : null,
  ]
}
