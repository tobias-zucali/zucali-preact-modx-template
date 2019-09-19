import { h } from 'preact'

import filterPages from '../../utils/filterPages'

import Section from '../../components/Section'


export default function Home({
  page,
}) {
  return (
    <div>
      <Section
        data={page}
      />
      {filterPages(
        page.childPages,
        { hidemenu: false }
      ).map((child) => (
        <Section
          data={child}
          key={child.id}
        />
      ))}
    </div>
  )
}
