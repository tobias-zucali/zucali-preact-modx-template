import { h } from 'preact'

import usePage from '../../hooks/usePage'


export default function Home({
  node,
}) {
  const page = usePage(node)
  console.log({ page })
  return (
    <h2>{node.pagetitle}</h2>
  )
}
