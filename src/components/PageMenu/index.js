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
  parent,
  isDisabled,
  ...otherProps
}) => {
  const intl = useIntl()
  return (
    <ul
      className={style.menuList}
      {...otherProps}
    >
      {children}
      <MenuListItems
        filters={{
          hasChildren: true,
          hidemenu: false,
        }}
        isDisabled={isDisabled}
        parent={parent}
      />
    </ul>
  )
}

const MenuListItems = ({
  filters,
  isDisabled,
  parent,
}) => {
  const intl = useIntl()
  return filterPages(parent.childPages, filters).map((childPage) => {
    const href = getPageHref(childPage)
    return (
      <MenuListEntry
        href={href}
        isDisabled={isDisabled}
        key={href}
      >
        {`${intl.getTranslatedAttribute(childPage, 'pagetitle')} `}
      </MenuListEntry>
    )
  })
}

const MenuListEntry = ({
  className,
  href,
  isDisabled,
  ...otherProps
}) => (
  <Match path={href}>
    {({ matches, path, url }) => {
      const isParent = !matches && path.startsWith(href)
      return (
        <li
          className={classnames(className, style.menuListEntry, {
            [style.menuListEntry_isActive]: matches,
            [style.menuListEntry_isParent]: isParent,
          })}
        >
          <Link
            className={style.menuListEntryLink}
            href={href}
            role="menuitem"
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => console.log('TODO: close menu')}
            {...otherProps}
          />
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
        parent={rootPage}
        isDisabled={!isOpen}
      >
        <MenuListEntry href="/">
          {intl.get('home')}
        </MenuListEntry>
        <MenuListItems
          filters={{
            hasChildren: false,
          }}
          isDisabled={!isOpen}
          parent={rootPage}
        />
        <hr />
      </MenuList>
    </div>
  ) : null
}
