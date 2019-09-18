import { useContext } from 'preact/hooks'
import Intl from '../../components/IntlProvider/context'


export default function useIntl() {
  return useContext(Intl)
}
