import redirectHtmlUrls from './redirectHtmlUrls'
import storeScrollPosition from './storeScrollPosition'


export default function handleRouteChange(event) {
  storeScrollPosition(event)
  redirectHtmlUrls(event)
}
