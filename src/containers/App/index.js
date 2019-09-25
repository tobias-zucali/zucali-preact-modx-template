import { h } from 'preact'
import { Router } from 'preact-router'

import useRootPage from '../../hooks/useRootPage'
import handleRouteChange from '../../utils/handleRouteChange'

import ChildPage from '../ChildPage'
import Home from '../Home'

import PageProvider from '../../components/PageProvider'
import TransitionDisabler from '../../components/TransitionDisabler'
import IntlProvider from '../../components/IntlProvider'
import Header from '../../components/Header'


const getChildRoutes = ({ childPages }) => childPages.map((page) => [
  <ChildPage
    key={page.href}
    page={page}
    path={page.href}
  />,
  ...getChildRoutes(page),
])

export default function App() {
  const rootPage = useRootPage()

  return (
    <TransitionDisabler>
      <IntlProvider
        locale="en"
      >
        <PageProvider>
          <Header />
          {rootPage ? (
            <Router
              key="router"
              onChange={handleRouteChange}
            >
              {getChildRoutes(rootPage)}
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
