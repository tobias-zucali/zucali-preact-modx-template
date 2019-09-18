import { h } from 'preact'
import { useMemo } from 'preact/hooks'

import Intl from './context'
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
    <Intl.Provider
      value={intl}
    >
      {children}
    </Intl.Provider>
  )
}
