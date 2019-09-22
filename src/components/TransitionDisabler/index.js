import { h } from 'preact'
import { route, Router } from 'preact-router'
import { useEffect, useState } from 'preact/hooks'
import classnames from 'classnames'

import style from './style.css'


export default function App(props) {
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(false)
    }, 500)
  }, [])

  return (
    <div
      className={classnames({
        [style.disableTransitions]: isDisabled,
      })}
      {...props}
    />
  )
}
