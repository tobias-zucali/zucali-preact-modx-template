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

  return (
    <ul
      aria-disabled={!isOpen}
      className={classnames(style.menu, {
        [style.menu_isOpen]: isOpen,
      })}
      id={id}
      role="menu"
      {...otherProps}
    >
      <MenuListEntry
        href="/"
        key="/"
      >
        {intl.get('home')}
      </MenuListEntry>
      {isLoaded && rootPage.childPages.map((page) => {
        const href = getPageHref(page)
        return (
          <MenuListEntry
            href={href}
            isDisabled={!isOpen}
            key={href}
          >
            {`${intl.getTranslatedAttribute(page, 'pagetitle')} `}
          </MenuListEntry>
        )
      })}
    </ul>
  )
}
