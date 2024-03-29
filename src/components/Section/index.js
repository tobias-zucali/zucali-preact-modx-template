import { h } from 'preact'
import Match from 'preact-router/match'
import classnames from 'classnames'

import useSectionBackground from '../../hooks/useSectionBackground'
import useIntl from '../../hooks/useIntl'

import config from '../../config'

import style from './style.scss'


export default function Section({
  page,
}) {
  const intl = useIntl()
  const {
    isLoaded,
    progress,
    sectionRef,
    top,
    backgroundImageUrl,
  } = useSectionBackground(page.cover)

  const quote = intl.getTranslatedAttribute(page, 'quote')
  const quoteAuthor = intl.getTranslatedAttribute(page, 'quoteAuthor')
  const pagetitle = intl.getTranslatedAttribute(page, 'pagetitle')
  const content = intl.getTranslatedAttribute(page, 'content')
  const buttonText = intl.getTranslatedAttribute(page, 'buttonText')

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
              bottom: `${progress * 400}px`,
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
          {({ matches }) => !matches && page.childPages.length > 0 && (
            <a
              href={page.href}
              className={style.sectionLink}
            >
              {buttonText || 'TODO: add nice button text'}
            </a>
          )}
        </Match>
      </div>
      <div className={style.background}>
        <div
          className={classnames(style.backgroundImage, {
            [style.backgroundImage_hidden]: !isLoaded,
          })}
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            top: `${top * 100}%`,
            transform: `scale(${progress * (config.sections.zoomFactor - 1) + 1})`,
          }}
        />
      </div>
    </div>
  )
}
