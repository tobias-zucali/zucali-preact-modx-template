import { h } from 'preact'
import { useMemo } from 'preact/hooks'

import Intl from './context'


const getIntl = (locale) => ({
  locale,
  getTranslatedAttribute(obj, key) {
    const translatedKey = (locale === 'de') ? key : `${key}_${locale}`
    return obj[translatedKey]
  },
})

export default function IntlProvider({
  children,
  locale,
}) {
  const intl = useMemo(
    () => getIntl(locale),
    [locale]
  )
  return (
    <Intl.Provider
      value={intl}
    >
      {children}
    </Intl.Provider>
  )
}
