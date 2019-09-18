import { h } from 'preact'

import useIntl from '../../hooks/useIntl'
import CmsImage from '../../components/CmsImage'


export default function Home({
  page,
}) {
  console.log({ page })
  const {
    cover,
  } = page
  const intl = useIntl()
  return (
    <div>
      <h2>{intl.getTranslatedAttribute(page, 'pagetitle')}</h2>
      <CmsImage
        path={cover}
        // width={1920}
      />
    </div>
  )
}
