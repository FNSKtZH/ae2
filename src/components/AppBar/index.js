// @flow
import React from 'react'
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
  loginData,
  withHandlers({
    onClickColumnButtonData: () => () => {
      app.history.push('/')
    },
    onClickColumnButtonExport: () => () => app.history.push('/Export'),
    onClickColumnButtonLogin: () => () => app.history.push('/Login'),
    onChangeImportButton: () => (event, key, value) =>
      app.history.push(`/Import/${value}`),
    ueberArteigenschaftenOnClick: () => () =>
      window.open('https://github.com/barbalex/ae2'),
    onClickShare: () => () => {
      navigator.share({
        // TODO: add name of object/pco/rco
        title: `arteigenschaften.ch`,
        url: window.location.href,
      })
    },
  })
)

const MyAppBar = ({
  activeNodeArrayData,
  loginData,
  onClickColumnButtonData,
  onClickColumnButtonExport,
  onChangeImportButton,
  onClickColumnButtonLogin,
  ueberArteigenschaftenOnClick,
  onClickShare,
  classes,
}: {
  activeNodeArrayData: Object,
  loginData: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onChangeImportButton: () => void,
  onClickColumnButtonLogin: () => void,
  ueberArteigenschaftenOnClick: () => void,
  onClickShare: () => void,
  classes: Object,
}) => {
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
  const username = get(loginData, 'login.username')
  const loginLabel = username ? username : 'nicht angemeldet'

  return (
    <ErrorBoundary>
      <Container>
        <StyledAppBar position="static">
          <Toolbar>
            <StyledTypography variant="title" color="inherit">
              Arteigenschaften
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

export default enhance(MyAppBar)
