import { h } from 'preact'

import getCmsImageUrl from '../../utils/getCmsImageUrl'


export default function CmsImage({
  alt = '',
  height,
  path,
  width,
  ...otherProps
}) {
  const src = getCmsImageUrl({
    height,
    path,
    width,
  })

  return (
    <img
      alt={alt}
      {...otherProps}
      src={src}
    />
  )
}
