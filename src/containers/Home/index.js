import { h } from 'preact'

import usePage from '../../hooks/usePage'
import useIntl from '../../hooks/useIntl'


export default function Home({
  node,
}) {
  const page = usePage(node) || node
  const intl = useIntl()
  console.log({ page })
  return (
    <h2>{intl.getTranslatedAttribute(page, 'pagetitle')}</h2>
  )
}
