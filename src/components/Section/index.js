import { h } from 'preact'

import useIntl from '../../hooks/useIntl'
import getCmsImageUrl from '../../utils/getCmsImageUrl'

// import CmsImage from '../CmsImage'

import style from './style.css'


export default function Section({
  data,
}) {
  console.log({ data, style })
  const {
    cover,
  } = data
  const intl = useIntl()
  return (
    <div>
      <h2>{intl.getTranslatedAttribute(data, 'pagetitle')}</h2>
      <div className={style.sectionBackground}>
        <div
          className={style.sectionBackgroundImage}
          style={`background-image: url(${getCmsImageUrl({ path: cover })});`}
        />
      </div>
    </div>
  )
}
