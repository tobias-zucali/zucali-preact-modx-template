import { h } from 'preact'
import { Link } from 'preact-router/match'

import getPageHref from '../../utils/getPageHref'

import style from './style.css'


export default function SiteMap({ page }) {
  const {
    alias,
    parentPages = [],
    pagetitle,
    childPages = [],
  } = page

  return (
    <div className={style.sitemap}>
      <Link
        activeClassName={style.active}
        href={getPageHref(page)}
      >{pagetitle}</Link>
      <ul>
        {childPages.map((child) => (
          <SiteMap
            page={child}
          />
        ))}
      </ul>
    </div>
  )
}
