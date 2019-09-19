import { h } from 'preact'
import classnames from 'classnames'

import useSectionBackground from '../../hooks/useSectionBackground'
import useIntl from '../../hooks/useIntl'

import style from './style.css'


export default function Section({
  data,
}) {
  // console.log({ data })
  const intl = useIntl()
  const sectionBackground = useSectionBackground(data.cover)

  return (
    <div
      className={style.section}
      ref={sectionBackground.sectionRef}
    >
      <div className={style.foreground}>
        {data.quote && (
          <blockquote
            className={style.quote}
            style={`
              bottom: ${sectionBackground.parallaxScale * 100 - 10}vh;
            `}
          >
            {data.quote}
            {data.quoteAuthor && (
              <cite
                className={classnames('regular', style.quoteAuthor)}
              >
                {data.quoteAuthor}
              </cite>
            )}
          </blockquote>
        )}

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
            transform: scale(${sectionBackground.parallaxScale * 0.2 + 1});
          `}
        />
      </div>
    </div>
  )
}
