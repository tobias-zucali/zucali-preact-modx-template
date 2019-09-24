import { useContext } from 'preact/hooks'
import PageContext from '../../components/PageProvider/context'


export default function usePages() {
  return useContext(PageContext)
}
