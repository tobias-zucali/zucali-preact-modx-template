import { h } from 'preact'
import classnames from 'classnames'

import useSectionBackground from '../../hooks/useSectionBackground'
import useIntl from '../../hooks/useIntl'

import style from './style.scss'


export default function Section({
  data,
}) {
  const intl = useIntl()
  const {
    url,
    isVisible,
    parallaxScale,
    sectionRef,
  } = useSectionBackground(data.cover)

  const quote = intl.getTranslatedAttribute(data, 'quote')
  const quoteAuthor = intl.getTranslatedAttribute(data, 'quoteAuthor')
  const pagetitle = intl.getTranslatedAttribute(data, 'pagetitle')
  const content = intl.getTranslatedAttribute(data, 'content')

  return (
    <div
      className={style.section}
      id={data.alias}
      ref={sectionRef}
    >
      <div className={style.foreground}>
        {data.quote && (
          <blockquote
            className={style.quote}
            style={{
              bottom: `${parallaxScale * 600 - 100}px`,
            }}
          >
            {quote}
            {quoteAuthor && (
              <cite
                className={classnames('regular', style.quoteAuthor)}
              >
                {quoteAuthor}
              </cite>
            )}
          </blockquote>
        )}
        <h2>{pagetitle}</h2>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className={style.background}>
        <div
          className={classnames(style.backgroundImage, {
            [style.backgroundImage_hidden]: !isVisible,
          })}
          style={{
            backgroundImage: `url(${url})`,
            transform: `scale(${parallaxScale * 0.2 + 1})`,
          }}
        />
      </div>
    </div>
  )
}
