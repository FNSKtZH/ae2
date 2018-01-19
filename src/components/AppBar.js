// @flow
import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Button from 'material-ui-next/Button'
import { withStyles } from 'material-ui-next/styles'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import app from 'ampersand-app'
import get from 'lodash/get'

import activeNodeArrayData from '../modules/activeNodeArrayData'
import loginData from '../modules/loginData'

/**
 * For unknown reason appbar does not follow display flex when
 * user form is shown: user covers appbar!!??
 * Container with display block is needed to prevent that
 */
const Container = styled.div`
  display: block;
`
const StyledAppBar = styled(AppBar)`
  @media print {
    display: none !important;
  }
`
const StyledButton = styled(Button)`
  color: rgb(255, 255, 255) !important;
  border: ${props => (props['data-visible'] ? 'none' : '1px solid !important')};
`
const MenuDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  > button {
    padding-top: 4px !important;
  }
`
const StyledMoreVertIcon = styled(MoreVertIcon)`
  color: white !important;
`
const iconMenuAnchorOrigin = { horizontal: 'left', vertical: 'bottom' }
const iconMenuTargetOrigin = { horizontal: 'left', vertical: 'top' }
const iconMenuStyle = { paddingLeft: 10 }

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

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
  }),
  withStyles(styles)
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
      <StyledAppBar
        title="Arteigenschaften"
        iconElementRight={
          <MenuDiv>
            <StyledButton
              data-visible={
                !['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
              }
              onClick={onClickColumnButtonData}
              className={classes.button}
            >
              Daten
            </StyledButton>
            <StyledButton
              data-visible={url0 !== 'export'}
              onClick={onClickColumnButtonExport}
              className={classes.button}
            >
              Export
            </StyledButton>
            <StyledButton
              data-visible={url0 !== 'login'}
              onClick={onClickColumnButtonLogin}
              className={classes.button}
            >
              {loginLabel}
            </StyledButton>
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <StyledMoreVertIcon />
                </IconButton>
              }
              anchorOrigin={iconMenuAnchorOrigin}
              targetOrigin={iconMenuTargetOrigin}
              style={iconMenuStyle}
            >
              <MenuItem
                primaryText="über arteigenschaften.ch"
                onClick={ueberArteigenschaftenOnClick}
              />
            </IconMenu>
          </MenuDiv>
        }
        showMenuIconButton={false}
      />
    </Container>
  )
}

export default enhance(MyAppBar)
