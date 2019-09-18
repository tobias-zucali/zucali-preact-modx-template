import { h } from 'preact'

import { Host } from '../../constants'


const prependedSlash = (src) => (src[0] === '/') ? src : `/${src}`
const removeAppendedSlash = (src) => (src.slice(-1) === '/') ? src.slice(0, -1) : src
const joinUrl = (srcA, srcB, ...moreSrc) => {
  const joinedUrl = removeAppendedSlash(srcA) + prependedSlash(srcB)
  if (moreSrc.length > 0) {
    return joinUrl(joinedUrl, ...moreSrc)
  }
  return joinedUrl
}

const getSrc = ({
  height,
  path,
  width,
}) => {
  let src
  if (height || width) {
    return joinUrl(
      Host.BASE,
      `assets/components/gallery/connector.php?action=web/phpthumb&ctx=web${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}&zc=1&far=C&q=90&src=`,
      encodeURIComponent(prependedSlash(path))
    )
  } else {
    return joinUrl(
      Host.BASE,
      path
    )
  }
}


export default function CmsImage({
  alt = '',
  height,
  path,
  width,
  ...otherProps
}) {
  const src = getSrc({
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


// http://www.zucali.com/assets/components/gallery/connector.php?action=web/phpthumb&ctx=web&w=300&h=240&zc=1&far=C&q=90&src=%2Fassets%2Fgallery%2F32%2F923.jpg
// http://www.zucali.com/assets/components/gallery/connector.php?action=web/phpthumb&ctx=web&w=300&h=240&zc=1&far=C&q=90&src=%2Fassets%2Fmedien%2FCoverbilder%2FA84A6758.jpg


// http://www.zucali.com/assets/medien/Coverbilder/A84A6758.jpg
