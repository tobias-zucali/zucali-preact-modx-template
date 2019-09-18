import { h } from 'preact'

import SiteMap from '../../components/SiteMap'


export default function Todo({
  page,
  rootPage,
}) {
  return (
    <div>
      <h2>Todo: {page.pagetitle}</h2>
      <SiteMap
        key="sitemap"
        page={rootPage}
      />
    </div>
  )
}
