import { h } from 'preact'

import filterPages from '../../utils/filterPages'

import Section from '../../components/Section'


export default function ChildPage({
  page,
}) {
  const childPages = filterPages(
    page.childPages,
    { hidemenu: false }
  )
  return (childPages.length > 0) ? (
    childPages.map((child) => (
      <Section
        page={child}
        key={child.id}
      />
    ))
  ) : (
    <Section
      page={page}
    />
  )
}
