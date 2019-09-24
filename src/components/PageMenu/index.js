import { h } from 'preact'
import { useState } from 'preact/hooks'
import classnames from 'classnames'

import Hamburger from '../Hamburger'
import PageList, { PageListEntry } from '../PageList'

import useIntl from '../../hooks/useIntl'
import useId from '../../hooks/useId'

import style from './style.scss'


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
        <PageList
          className={style.metaList}
          filters={{
            hasChildren: false,
          }}
          isDisabled={!isMenuOpen}
          isRecursive={false}
          onClick={handleClick}
          parent={rootPage}
        >
          <PageListEntry
            href="/"
            onClick={handleClick}
          >
            TODO: switch language
          </PageListEntry>
          <PageListEntry
            href="/"
            onClick={handleClick}
          >
            {intl.get('home')}
          </PageListEntry>
        </PageList>
        <PageList
          filters={{
            hasChildren: true,
            hidemenu: false,
          }}
          isDisabled={!isMenuOpen}
          isRecursive={true}
          recursiveFilters={{
            hidemenu: false,
          }}
          onClick={handleClick}
          parent={rootPage}
        />
      </div>
    ) : null,
  ]
}
