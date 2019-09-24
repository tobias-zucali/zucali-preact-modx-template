import { h } from 'preact'
import { route, Router } from 'preact-router'

import useRootPage from '../../hooks/useRootPage'

import Todo from '../Todo'
import Home from '../Home'
import PageProvider from '../PageProvider'

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
  const rootPage = useRootPage()

  return (
    <TransitionDisabler>
      <IntlProvider
        locale="en"
      >
        <PageProvider>
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
        </PageProvider>
      </IntlProvider>
    </TransitionDisabler>
  )
}
