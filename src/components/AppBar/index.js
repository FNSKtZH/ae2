// @flow
import React, {
  lazy,
  Suspense,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Icon from '@material-ui/core/Icon'
import ShareIcon from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import compose from 'recompose/compose'
import app from 'ampersand-app'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import withData from './withData'
import withActiveNodeArrayData from '../../modules/withActiveNodeArrayData'
import withLoginData from '../../modules/withLoginData'
import ErrorBoundary from '../shared/ErrorBoundary'
import LazyImportFallback from '../shared/LazyImportFallback'

const MoreMenu = lazy(() => import('./MoreMenu'))

/**
 * For unknown reason appbar does not follow display flex when
 * user form is shown: user covers appbar!!??
 * Container with display block is needed to prevent that
 */
const Container = styled.div`
  display: block;
`
const StyledAppBar = styled(AppBar)`
  background-color: #e65100 !important;
  @media print {
    display: none !important;
  }
`
const StyledToolbar = styled(Toolbar)`
  flex-wrap: wrap;
`
const StyledTypography = styled(Typography)`
  flex: 1;
  color: white !important;
  margin-right: 12px !important;
`
const StyledButton = styled(Button)`
  color: rgb(255, 255, 255) !important;
  border: ${props => (props['data-active'] ? '1px solid !important' : 'none')};
  margin: 8px;
`
const LoginButton = styled(StyledButton)`
  min-width: ${props =>
    props['data-widelayout'] ? 'inherit' : '40px !important'};
  max-width: ${props => (props['data-widelayout'] ? 'inherit' : '40px')};
`
const ShareButton = styled(StyledButton)`
  min-width: 40px !important;
  max-width: 40px;
`
const StyledMoreVertIcon = styled(ShareIcon)`
  color: white !important;
`
const getInitials = name => name.match(/\b(\w)/g).join('')

const enhance = compose(
  withActiveNodeArrayData,
  withData,
  withLoginData,
)

const MyAppBar = ({
  activeNodeArrayData,
  loginData,
  appBarData,
}: {
  activeNodeArrayData: Object,
  loginData: Object,
  appBarData: Object,
}) => {
  /**
   * need to measure all buttons width
   * to change them when view is too narrow
   */
  /**
   * need to set divs around Toolbar and Buttons
   * because measure ref needs to be on a real element
   */
  /**
   * need to set wideLayout using state in an effect
   * because setting it needs to be debounced
   */
  const [wideLayout, setWideLayout] = useState(true)

  const toolbarC = useRef(null)
  const datenC = useRef(null)
  const exportC = useRef(null)
  const loginC = useRef(null)
  const moreC = useRef(null)
  const shareC = useRef(null)

  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
  const username = get(loginData, 'login.username')
  const loginLabel = username
    ? wideLayout
      ? username
      : getInitials(username)
    : wideLayout
    ? 'nicht angemeldet'
    : 'n.a.'
  const loginTitle = username ? 'abmelden' : 'anmelden'
  const objektName = get(appBarData, 'objectById.name')
  const pCName = get(appBarData, 'propertyCollectionById.name')
  const taxName = get(appBarData, 'taxonomyById.name')

  const onClickColumnButtonData = useCallback(() => app.history.push('/'))
  const onClickColumnButtonExport = useCallback(() =>
    app.history.push('/Export'),
  )
  const onClickColumnButtonLogin = useCallback(() => app.history.push('/Login'))
  const onClickShare = useCallback(
    () => {
      const name = pCName
        ? pCName
        : objektName
        ? `${taxName}: ${objektName}`
        : taxName
        ? taxName
        : url0
        ? url0
        : ''
      const title = `arteigenschaften.ch${!!name ? ': ' : ''}${name}`
      navigator.share({
        title,
        url: window.location.href,
      })
    },
    [pCName, objektName, taxName, url0],
  )

  const setLayout = useCallback(
    () => {
      // should do this by comparing scrollWidth with clientWidth
      // if clientWidth < scrollWidth then div is overflowing
      // BUT: every second measurement gives clientWidth === scrollWidth,
      // even when absolutely wrong
      const toolbarCWidth = toolbarC.current ? toolbarC.current.clientWidth : 0
      const datenCWidth = datenC.current ? datenC.current.offsetWidth : 0
      const exportCWidth = exportC.current ? exportC.current.offsetWidth : 0
      const loginCWidth = loginC.current ? loginC.current.offsetWidth : 0
      const moreCWidth = moreC.current ? moreC.current.offsetWidth : 0
      const shareCWidth = shareC.current ? shareC.current.offsetWidth : 0
      const totalWidth =
        datenCWidth + exportCWidth + loginCWidth + moreCWidth + shareCWidth
      let shouldLayoutWide = toolbarCWidth - totalWidth > 260
      // need to set narrow to wide later to prevent jumping between
      if (!wideLayout) shouldLayoutWide = toolbarCWidth - totalWidth > 400
      if (shouldLayoutWide !== wideLayout) {
        setWideLayout(shouldLayoutWide)
      }
    },
    [wideLayout, toolbarC, datenC, exportC, loginC, moreC, shareC],
  )

  useEffect(() => {
    window.addEventListener('resize', debounce(setLayout, 200))
    setTimeout(() => setLayout(), 100)
    return () => window.removeEventListener('resize', debounce(setLayout, 200))
  })

  return (
    <ErrorBoundary>
      <Container>
        <StyledAppBar position="static">
          <div ref={toolbarC}>
            <StyledToolbar>
              <StyledTypography variant="title" color="inherit">
                {wideLayout ? 'Arteigenschaften' : ''}
              </StyledTypography>
              <div ref={datenC}>
                <StyledButton
                  data-active={[
                    undefined,
                    'arten',
                    'lebensräume',
                    'eigenschaften-sammlungen',
                    'benutzer',
                    'organisationen',
                  ].includes(url0)}
                  onClick={onClickColumnButtonData}
                >
                  Daten
                </StyledButton>
              </div>
              <div ref={exportC}>
                <StyledButton
                  data-active={url0 === 'export'}
                  onClick={onClickColumnButtonExport}
                >
                  Export
                </StyledButton>
              </div>
              <div ref={loginC}>
                <LoginButton
                  data-active={url0 === 'login'}
                  data-widelayout={wideLayout}
                  onClick={onClickColumnButtonLogin}
                  title={loginTitle}
                >
                  {loginLabel}
                </LoginButton>
              </div>
              {navigator.share !== undefined && (
                <div ref={shareC}>
                  <ShareButton aria-label="teilen" onClick={onClickShare}>
                    <Icon>
                      <StyledMoreVertIcon />
                    </Icon>
                  </ShareButton>
                </div>
              )}
              <Suspense fallback={<LazyImportFallback />}>
                <div ref={moreC}>
                  <MoreMenu />
                </div>
              </Suspense>
            </StyledToolbar>
          </div>
        </StyledAppBar>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(MyAppBar)
