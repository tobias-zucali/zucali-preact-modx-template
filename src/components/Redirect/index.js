import { h } from 'preact'
import { Link, route } from 'preact-router'

import useRedirect from '../../hooks/useRedirect'


export default function Redirect({
  to,
}) {
  useRedirect(to)
  return (
    <div>
      Redirecting to <Link href={to}>{to}</Link>
    </div>
  )
}
