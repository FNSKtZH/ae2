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
const ShareButton = styled(StyledButton)`
  min-width: 40px !important;
  max-width: 40px;
`
const StyledMoreVertIcon = styled(ShareIcon)`
  color: white !important;
`

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
  showTitle: Boolean,
  toolbarComponent: Object,
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
    showTitle: true,
    toolbarComponent: null,
  }

  componentDidMount() {
    const toolbarComponent = ReactDOM.findDOMNode(this.toolbar)
    this.setState({ toolbarComponent })
    window.addEventListener('resize', this.updateShowTitle)
    setTimeout(() => this.updateShowTitle())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateShowTitle)
  }

  updateShowTitle = () => {
    const { toolbarComponent, showTitle } = this.state
    const shouldShowTitle =
      toolbarComponent.clientWidth === toolbarComponent.scrollWidth
    if (shouldShowTitle !== showTitle) {
      this.setState({ showTitle: shouldShowTitle })
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
    const { showTitle } = this.state

    const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
    const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
    const username = get(loginData, 'login.username')
    const loginLabel = username ? username : 'nicht angemeldet'
    console.log('this.toolbar is rendering, showTitle:', showTitle)

    return (
      <ErrorBoundary>
        <Container>
          <StyledAppBar position="static">
            <Toolbar ref={c => (this.toolbar = c)}>
              <StyledTypography variant="title" color="inherit">
                {showTitle ? 'Arteigenschaften' : ''}
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
              >
                Daten
              </StyledButton>
              <StyledButton
                data-active={url0 === 'export'}
                onClick={onClickColumnButtonExport}
              >
                Export
              </StyledButton>
              <StyledButton
                data-active={url0 === 'login'}
                onClick={onClickColumnButtonLogin}
              >
                {loginLabel}
              </StyledButton>
              {navigator.share !== undefined && (
                <ShareButton aria-label="teilen" onClick={onClickShare}>
                  <Icon>
                    <StyledMoreVertIcon />
                  </Icon>
                </ShareButton>
              )}
              <MoreMenu />
            </Toolbar>
          </StyledAppBar>
        </Container>
      </ErrorBoundary>
    )
  }
}

export default enhance(MyAppBar)
