import { h } from 'preact'
import classnames from 'classnames'

import useSectionBackground from './useSectionBackground'
import useIntl from '../../hooks/useIntl'

import SideBar from '../SideBar'

import style from './style.css'


export default function Section({
  data,
}) {
  const intl = useIntl()
  const sectionBackground = useSectionBackground(data.cover)

  return (
    <div
      className={style.section}
      ref={sectionBackground.sectionRef}
    >
      <div className={style.foreground}>
        <h2>{intl.getTranslatedAttribute(data, 'pagetitle')}</h2>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: intl.getTranslatedAttribute(data, 'content') }}
        />
      </div>
      <div className={style.background}>
        <div
          className={classnames(style.backgroundImage, {
            [style.backgroundImage_hidden]: !sectionBackground.isVisible,
          })}
          style={`
            background-image: url(${sectionBackground.url});
            margin-top: ${sectionBackground.topOffset * -1}px;
            margin-left: ${sectionBackground.sideOffset * -1}px;
          `}
        />
      </div>
    </div>
  )
}
