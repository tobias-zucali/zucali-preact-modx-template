import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'


export default function useRedirect(to) {
  useEffect(() => {
    route(to, true)
  }, [to])
}
