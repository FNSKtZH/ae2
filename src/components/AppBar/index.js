// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Icon from 'material-ui/Icon'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import app from 'ampersand-app'
import get from 'lodash/get'
import appBarData from './data'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import loginData from '../../modules/loginData'
import MoreMenu from './MoreMenu'
import ErrorBoundary from '../shared/ErrorBoundary'

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
  activeNodeArrayData,
  appBarData,
  loginData,
  withHandlers({
    onClickColumnButtonData: () => () => {
      app.history.push('/')
    },
    onClickColumnButtonExport: () => () => app.history.push('/Export'),
    onClickColumnButtonLogin: () => () => app.history.push('/Login'),
    onClickShare: ({ appBarData, activeNodeArrayData }) => () => {
      const objektName = get(appBarData, 'objectById.name')
      const pCName = get(appBarData, 'propertyCollectionById.name')
      const taxName = get(appBarData, 'taxonomyById.name')
      const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
      const url0 = activeNodeArray[0]
      const name = pCName
        ? pCName
        : objektName
          ? `${taxName}: ${objektName}`
          : taxName ? taxName : url0 ? url0 : ''
      const title = `arteigenschaften.ch${!!name ? ': ' : ''}${name}`
      navigator.share({
        title,
        url: window.location.href,
      })
    },
  })
)

type State = {
  wideLayout: Boolean,
  toolbarComponent: Object,
  datenComponent: Object,
  exportComponent: Object,
  loginComponent: Object,
  moreComponent: Object,
  shareComponent: Object,
}

type Props = {
  activeNodeArrayData: Object,
  loginData: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onClickColumnButtonLogin: () => void,
  onClickShare: () => void,
}

class MyAppBar extends Component<Props, State> {
  state = {
    wideLayout: true,
    toolbarComponent: null,
    datenComponent: null,
    exportComponent: null,
    loginComponent: null,
    moreComponent: null,
    shareComponent: null,
  }

  componentDidMount() {
    const toolbarComponent = ReactDOM.findDOMNode(this.toolbar)
    const datenComponent = ReactDOM.findDOMNode(this.daten)
    const exportComponent = ReactDOM.findDOMNode(this.export)
    const loginComponent = ReactDOM.findDOMNode(this.login)
    const moreComponent = ReactDOM.findDOMNode(this.more)
    const shareComponent = ReactDOM.findDOMNode(this.share)
    this.setState({
      toolbarComponent,
      datenComponent,
      exportComponent,
      loginComponent,
      moreComponent,
      shareComponent,
    })
    window.addEventListener('resize', this.updateLayout)
    setTimeout(() => this.updateLayout())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateLayout)
  }

  updateLayout = () => {
    const {
      toolbarComponent,
      datenComponent,
      exportComponent,
      loginComponent,
      moreComponent,
      shareComponent,
      wideLayout,
    } = this.state
    // should do this by comparing scrollWidth with clientWidth
    // if clientWidth < scrollWidth then div is overflowing
    // BUT: every second measurement gives clientWidth === scrollWidth,
    // even when absolutely wrong
    const { clientWidth } = toolbarComponent
    const totalWidth =
      datenComponent.offsetWidth +
      exportComponent.offsetWidth +
      loginComponent.offsetWidth +
      moreComponent.offsetWidth +
      (shareComponent ? shareComponent.offsetWidth : 0)
    const shouldLayoutWide = clientWidth - totalWidth > 260
    if (shouldLayoutWide !== wideLayout) {
      this.setState({ wideLayout: shouldLayoutWide })
    }
  }

  render() {
    const {
      activeNodeArrayData,
      loginData,
      onClickColumnButtonData,
      onClickColumnButtonExport,
      onClickColumnButtonLogin,
      onClickShare,
    } = this.props
    const { wideLayout } = this.state

    const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
    const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
    const username = get(loginData, 'login.username')
    const loginLabel = username
      ? wideLayout ? username : getInitials(username)
      : wideLayout ? 'nicht angemeldet' : 'n.a.'
    const loginTitle = username ? 'abmelden' : 'anmelden'

    return (
      <ErrorBoundary>
        <Container>
          <StyledAppBar position="static">
            <StyledToolbar ref={c => (this.toolbar = c)}>
              <StyledTypography variant="title" color="inherit">
                {wideLayout ? 'Arteigenschaften' : ''}
              </StyledTypography>
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
                ref={c => (this.daten = c)}
              >
                Daten
              </StyledButton>
              <StyledButton
                data-active={url0 === 'export'}
                onClick={onClickColumnButtonExport}
                ref={c => (this.export = c)}
              >
                Export
              </StyledButton>
              <LoginButton
                data-active={url0 === 'login'}
                data-widelayout={wideLayout}
                onClick={onClickColumnButtonLogin}
                ref={c => (this.login = c)}
                title={loginTitle}
              >
                {loginLabel}
              </LoginButton>
              {navigator.share !== undefined && (
                <ShareButton
                  aria-label="teilen"
                  onClick={onClickShare}
                  ref={c => (this.share = c)}
                >
                  <Icon>
                    <StyledMoreVertIcon />
                  </Icon>
                </ShareButton>
              )}
              <MoreMenu ref={c => (this.more = c)} />
            </StyledToolbar>
          </StyledAppBar>
        </Container>
      </ErrorBoundary>
    )
  }
}

export default enhance(MyAppBar)
