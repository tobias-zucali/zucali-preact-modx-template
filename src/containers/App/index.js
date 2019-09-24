import { h } from 'preact'
import { route, Router } from 'preact-router'

import useResources from '../../hooks/useResources'

import Todo from '../Todo'
import Home from '../Home'

import TransitionDisabler from '../../components/TransitionDisabler'
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
    <TransitionDisabler>
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
            {rootPage.childPages.map((page) => (
              <Todo
                key={page.href}
                page={page}
                rootPage={rootPage}
                path={page.href}
              />
            ))}
            <Home
              default
              page={rootPage}
            />
          </Router>
        ) : 'loading'}
      </IntlProvider>
    </TransitionDisabler>
  )
}
