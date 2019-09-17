import { h } from 'preact'
import { Link } from 'preact-router/match'

import getNodeHref from '../../utils/getNodeHref'

import style from './style.css'


export default function SiteMap({ node }) {
  const {
    alias,
    parentNodes = [],
    pagetitle,
    childNodes = [],
  } = node

  return (
    <div className={style.sitemap}>
      <Link
        activeClassName={style.active}
        href={getNodeHref(node)}
      >{pagetitle}</Link>
      <ul>
        {childNodes.map((child) => (
          <SiteMap
            node={child}
          />
        ))}
      </ul>
    </div>
  )
}
