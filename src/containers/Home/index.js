import { h } from 'preact'

import filterPages from '../../utils/filterPages'

import Section from '../../components/Section'


export default function Home({
  page,
}) {
  return (
    <div>
      <Section
        page={page}
      />
      {filterPages(
        page.childPages,
        { hidemenu: false }
      ).map((child) => (
        <Section
          page={child}
          key={child.id}
        />
      ))}
    </div>
  )
}
