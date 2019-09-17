import { h } from 'preact'

export default function Todo({
  node,
}) {
  return (
    <h2>Todo: {node.pagetitle}</h2>
  )
}
