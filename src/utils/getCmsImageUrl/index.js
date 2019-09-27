import config from '../../config'


const prependedSlash = (src) => (src[0] === '/') ? src : `/${src}`
const removeAppendedSlash = (src) => (src.slice(-1) === '/') ? src.slice(0, -1) : src
const joinUrl = (srcA, srcB, ...moreSrc) => {
  const joinedUrl = removeAppendedSlash(srcA) + prependedSlash(srcB)
  if (moreSrc.length > 0) {
    return joinUrl(joinedUrl, ...moreSrc)
  }
  return joinedUrl
}


export default function getCmsImageUrl({
  height,
  path,
  width,
}) {
  let src
  if (height || width) {
    return joinUrl(
      config.host.BASE,
      `assets/components/gallery/connector.php?action=web/phpthumb&ctx=web${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}&zc=1&far=C&q=90&src=`,
      encodeURIComponent(prependedSlash(path))
    )
  } else {
    return joinUrl(
      config.host.BASE,
      path
    )
  }
}
