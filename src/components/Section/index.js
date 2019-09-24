import { h } from 'preact'
import Match from 'preact-router/match'
import classnames from 'classnames'

import useSectionBackground from '../../hooks/useSectionBackground'
import useIntl from '../../hooks/useIntl'

import style from './style.scss'


export default function Section({
  page,
}) {
  const intl = useIntl()
  const {
    url,
    isVisible,
    parallaxScale,
    sectionRef,
  } = useSectionBackground(page.cover)

  const quote = intl.getTranslatedAttribute(page, 'quote')
  const quoteAuthor = intl.getTranslatedAttribute(page, 'quoteAuthor')
  const pagetitle = intl.getTranslatedAttribute(page, 'pagetitle')
  const content = intl.getTranslatedAttribute(page, 'content')

  return (
    <div
      className={style.section}
      id={page.alias}
      ref={sectionRef}
    >
      <div className={style.foreground}>
        {page.quote && (
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
        <Match path={page.href}>
          {({ matches }) => !matches && (
            <a
              href={page.href}
              className={style.sectionLink}
            >
              TODO: nice button text
            </a>
          )}
        </Match>
      </div>
      <div className={style.background}>
        <div
          className={classnames(style.backgroundImage, {
            [style.backgroundImage_hidden]: !isVisible,
          })}
          style={{
            backgroundImage: `url(${url})`,
            transform: `scale(${parallaxScale * 0.4 + 1})`,
          }}
        />
      </div>
    </div>
  )
}
