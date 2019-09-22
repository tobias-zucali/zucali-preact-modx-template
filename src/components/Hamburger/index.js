import { h } from 'preact'
import classnames from 'classnames'

import useIntl from '../../hooks/useIntl'

import style from './style.css'


export default function Hamburger({
  className,
  isOpen,
  ...otherProps
}) {
  return (
    <div
      className={classnames(className, style.hamburger, {
        [style.hamburger_isOpen]: isOpen,
      })}
      {...otherProps}
    >
      <div className={style.hamburgerStrokeFirst} />
      <div className={style.hamburgerStroke} />
      <div className={style.hamburgerStrokeLast} />
    </div>
  )
}
