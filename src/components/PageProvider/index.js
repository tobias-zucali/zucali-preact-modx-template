import { h } from 'preact'
import { useMemo } from 'preact/hooks'

import Match from 'preact-router/match'
import Helmet from 'preact-helmet'

import PageContext from './context'

import useRootPage from '../../hooks/useRootPage'
import useIntl from '../../hooks/useIntl'


const getMatchingPage = (path, page) => {
  const matchingChildPage = page && page.childPages.find(
    (childPage) => path.startsWith(childPage.href)
  )
  if (matchingChildPage) {
    return getMatchingPage(path, matchingChildPage)
  } else {
    return page
  }
}

const getPageInfo = (path, rootPage) => ({
  currentPage: getMatchingPage(path, rootPage),
  rootPage,
})

export default function PageProvider({
  children,
}) {
  const intl = useIntl()
  const rootPage = useRootPage()
  return (
    <Match>
      {({ path }) => {
        const pageInfo = useMemo(
          () => getPageInfo(path, rootPage),
          [path, rootPage]
        )
        return (
          <PageContext.Provider
            value={pageInfo}
          >
            <Helmet
              htmlAttributes={{ lang: intl.locale }}
              title={pageInfo.currentPage
                ? `${intl.getTranslatedAttribute(pageInfo.currentPage, 'pagetitle')} | ${intl.get('pageTitle')}`
                : intl.get('pageTitle')
              }
            />
            {children}
          </PageContext.Provider>
        )
      }}
    </Match>
  )
}
