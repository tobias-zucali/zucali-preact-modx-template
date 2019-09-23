import { h } from 'preact'
import { Link } from 'preact-router'
import Match from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'

import getPageHref from '../../utils/getPageHref'
import filterPages from '../../utils/filterPages'

import style from './style.scss'


const MenuList = ({
  children,
  className,
  filters,
  parent,
  isDisabled,
  isRecursive,
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
  page,
  href,
  isDisabled,
  isRecursive,
  filters,
  ...otherProps
}) => (
  <MenuListEntry
    href={href}
    isDisabled={isDisabled}
    nestedMenu={isRecursive && (
      <MenuList
        filters={filters}
        parent={page}
        isDisabled={isDisabled}
        isRecursive={isRecursive}
      />
    )}
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
            role="menuitem"
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => console.log('TODO: close menu')}
          >
            {children}
          </Link>
          {nestedMenu}
        </li>)
    }}
  </Match>
)

export default function PageMenu({
  id,
  isOpen,
  rootPage,
  ...otherProps
}) {
  const intl = useIntl()

  const isLoaded = rootPage && rootPage.childPages

  return isLoaded ? (
    <div
      aria-disabled={!isOpen}
      className={classnames(style.menu, {
        [style.menu_isOpen]: isOpen,
      })}
      id={id}
      role="menu"
      {...otherProps}
    >
      <MenuList
        className={style.menuList_paddingBottom}
        filters={{
          hasChildren: false,
        }}
        isDisabled={!isOpen}
        isRecursive={true}
        parent={rootPage}
      >
        <MenuListEntry href="/">
          {intl.get('home')}
        </MenuListEntry>
      </MenuList>
      <MenuList
        filters={{
          hasChildren: true,
        }}
        isDisabled={!isOpen}
        isRecursive={true}
        parent={rootPage}
      />
    </div>
  ) : null
}
