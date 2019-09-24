import { h } from 'preact'
import { useMemo } from 'preact/hooks'

import IntlContext from './context'
import messages from './messages.json'
import getIntl from './getIntl'


export default function IntlProvider({
  children,
  locale,
}) {
  const intl = useMemo(
    () => getIntl({ locale, messages }),
    [locale]
  )
  return (
    <IntlContext.Provider
      value={intl}
    >
      {children}
    </IntlContext.Provider>
  )
}
