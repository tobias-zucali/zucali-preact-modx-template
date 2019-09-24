import { h, toChildArray } from 'preact'
import { useState } from 'preact/hooks'
import classnames from 'classnames'

import { Link } from 'preact-router'
import Match from 'preact-router/match'

import useIntl from '../../hooks/useIntl'

import filterPages from '../../utils/filterPages'

import style from './style.scss'


// Using a hook to be able to detect an empty result
// TODO: find a more elegant way
const usePageList = (props) => {
  const intl = useIntl()

  // Hooks need to be called in any case. We can do a empty run by not setting props
  if (!props) {
    return null
  }

  const {
    children,
    className,
    filters,
    isDisabled,
    isRecursive,
    onClick,
    parent,
    ...otherProps
  } = props

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
      className={classnames(style.pageList, className)}
      {...otherProps}
    >
      {children}
      {listItems}
    </ul>
  ) : null
}

export const PageListPageEntry = ({
  children,
  filters,
  isDisabled,
  isRecursive,
  onClick,
  page,
  ...otherProps
}) => {
  const nestedMenu = usePageList(isRecursive && {
    filters,
    isDisabled,
    isRecursive,
    onClick,
    parent: page,
  })

  return (
    <PageListEntry
      href={page.href}
      isDisabled={isDisabled}
      nestedMenu={nestedMenu}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </PageListEntry>
  )
}

export const PageListEntry = ({
  children,
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
      const [isOpen, setIsOpen] = useState(() => nestedMenu && (matches || isParent))
      return (
        <li
          {...otherProps}
        >
          <div
            className={style.pageListEntry}
          >
            {nestedMenu && (
              <button
                className={style.pageListEntryExpand}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? '-' : '+'}
              </button>
            )}
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
          </div>
          {isOpen && nestedMenu}
        </li>
      )
    }}
  </Match>
)

export default function PageList(props) {
  const pageList = usePageList(props)

  return pageList
}
