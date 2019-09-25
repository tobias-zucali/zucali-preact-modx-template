import { route } from 'preact-router'


const htmlUrlExp = /([^#?]*)(\.html?)(($|\?|#).*)/i
export default function redirectHtmlUrls({ url }) {
  const urlWithoutExtension = url.replace(htmlUrlExp, '$1$3')
  if (url !== urlWithoutExtension) {
    route(urlWithoutExtension, true)
  }
}
