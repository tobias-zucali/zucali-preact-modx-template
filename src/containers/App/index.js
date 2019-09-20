import { h } from 'preact'
import { route, Router } from 'preact-router'

import getPageHref from '../../utils/getPageHref'
import useResources from '../../hooks/useResources'

import Todo from '../Todo'
import Home from '../Home'

import IntlProvider from '../../components/IntlProvider'
import Header from '../../components/Header'


const htmlUrlExp = /([^#?]*)(\.html?)(($|\?|#).*)/i
const redirectHtmlUrls = ({ url }) => {
  const urlWithoutExtension = url.replace(htmlUrlExp, '$1$3')
  if (url !== urlWithoutExtension) {
    route(urlWithoutExtension, true)
  }
}

export default function App() {
  const rootPage = useResources()

  return (
    <IntlProvider
      locale="en"
    >
      <Header
        rootPage={rootPage}
      />
      {rootPage ? (
        <Router
          key="router"
          onChange={redirectHtmlUrls}
        >
          {rootPage.childPages.map((page) => {
            const href = getPageHref(page)
            return (
              <Todo
                key={href}
                page={page}
                rootPage={rootPage}
                path={href}
              />
            )
          })}
          <Home
            default
            page={rootPage}
          />
        </Router>
      ) : 'loading'}
    </IntlProvider>
  )
}
