import { h } from 'preact'
import { Link } from 'preact-router/match'

import style from './style.css'


export default function SiteMap({ page }) {
  const {
    pagetitle,
    childPages = [],
  } = page

  return (
    <div className={style.sitemap}>
      <Link
        activeClassName={style.active}
        href={page.href}
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
