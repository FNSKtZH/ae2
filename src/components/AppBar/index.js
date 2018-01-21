// @flow
import React from 'react'
import AppBar from 'material-ui-next/AppBar'
import Toolbar from 'material-ui-next/Toolbar'
import Typography from 'material-ui-next/Typography'
import Button from 'material-ui-next/Button'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import app from 'ampersand-app'
import get from 'lodash/get'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import loginData from '../../modules/loginData'
import MoreMenu from './MoreMenu'

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
  border: ${props => (props['data-visible'] ? 'none' : '1px solid !important')};
  margin: 8px;
`

const enhance = compose(
  activeNodeArrayData,
  loginData,
  withHandlers({
    onClickColumnButtonData: ({ activeNodeArrayData }) => () => {
      const { activeNodeArray } = activeNodeArrayData
      const pathIsMain = ['Taxonomien', 'Eigenschaften-Sammlungen'].includes(
        activeNodeArray[0]
      )
      if (!pathIsMain) {
        app.history.push('/Taxonomien')
      }
    },
    onClickColumnButtonExport: () => () => app.history.push('/Export'),
    onClickColumnButtonLogin: () => () => app.history.push('/Login'),
    onChangeImportButton: () => (event, key, value) =>
      app.history.push(`/Import/${value}`),
    ueberArteigenschaftenOnClick: () => () =>
      window.open('https://github.com/barbalex/ae2'),
  })
)

const MyAppBar = ({
  activeNodeArrayData,
  onClickColumnButtonData,
  onClickColumnButtonExport,
  onChangeImportButton,
  onClickColumnButtonLogin,
  ueberArteigenschaftenOnClick,
  loginData,
  classes,
}: {
  activeNodeArrayData: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onChangeImportButton: () => void,
  onClickColumnButtonLogin: () => void,
  ueberArteigenschaftenOnClick: () => void,
  loginData: Object,
  classes: Object,
}) => {
  const activeNodeArray = activeNodeArrayData.activeNodeArray || []
  const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
  const login = get(loginData, 'login')
  const username = login && login.username ? login.username : null
  const loginLabel = username ? username : 'nicht angemeldet'

  return (
    <Container>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledTypography type="title" color="inherit">
            Arteigenschaften
          </StyledTypography>
          <StyledButton
            data-visible={
              !['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
            }
            onClick={onClickColumnButtonData}
            //className={classes.button}
          >
            Daten
          </StyledButton>
          <StyledButton
            data-visible={url0 !== 'export'}
            onClick={onClickColumnButtonExport}
          >
            Export
          </StyledButton>
          <StyledButton
            data-visible={url0 !== 'login'}
            onClick={onClickColumnButtonLogin}
          >
            {loginLabel}
          </StyledButton>
          <MoreMenu />
        </Toolbar>
      </StyledAppBar>
    </Container>
  )
}

export default enhance(MyAppBar)
