import { h } from 'preact'

import useIntl from '../../hooks/useIntl'


export default function Home({
  page,
}) {
  const intl = useIntl()
  return (
    <h2>{intl.getTranslatedAttribute(page, 'pagetitle')}</h2>
  )
}
