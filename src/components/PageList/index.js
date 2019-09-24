import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router'
import Match from 'preact-router/match'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'

import filterPages from '../../utils/filterPages'

import style from './style.scss'


export const PageListPageEntry = ({
  children,
  filters,
  isDisabled,
  isRecursive,
  onClick,
  page,
  ...otherProps
}) => (
  <PageListEntry
    href={page.href}
    isDisabled={isDisabled}
    nestedMenu={isRecursive && (
      <PageList
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
  </PageListEntry>
)

export const PageListEntry = ({
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
          className={classnames(className, style.pageListEntry)}
          {...otherProps}
        >
          <Link
            className={classnames(style.pageListEntryLink, {
              [style.pageListEntryLink_isActive]: matches,
              [style.pageListEntryLink_isParent]: isParent,
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

export default function PageList({
  children,
  className,
  filters,
  isDisabled,
  isRecursive,
  onClick,
  parent,
  ...otherProps
}) {
  const intl = useIntl()

  const listItems = filterPages(parent.childPages, filters).map((childPage) => (
    <PageListPageEntry
      isDisabled={isDisabled}
      isRecursive={isRecursive}
      key={childPage.href}
      onClick={onClick}
      page={childPage}
    >
      {`${intl.getTranslatedAttribute(childPage, 'pagetitle')} `}
    </PageListPageEntry>
  ))

  return listItems.length > 0 || children ? (
    <ul
      className={classnames(className, style.pageList)}
      {...otherProps}
    >
      {children}
      {listItems}
    </ul>
  ) : null
}
