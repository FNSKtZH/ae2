// @flow
import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { withApollo } from 'react-apollo'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import app from 'ampersand-app'
import get from 'lodash/get'

import activeNodeArrayData from '../modules/activeNodeArrayData'
import loginData from '../modules/loginData'

const StyledAppBar = styled(AppBar)`
  @media print {
    display: none !important;
  }
`
const Button = styled(FlatButton)`
  color: ${props =>
    props['data-visible']
      ? 'rgb(255, 255, 255) !important'
      : 'rgba(255, 255, 255, 0.298039) !important'};
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
const SymbolIcon = styled(FontIcon)`
  color: ${props =>
    props['data-visible']
      ? 'rgb(255, 255, 255) !important'
      : 'rgba(255, 255, 255, 0.298039) !important'};
  margin-left: -5px !important;
`
const iconMenuAnchorOrigin = { horizontal: 'left', vertical: 'bottom' }
const iconMenuTargetOrigin = { horizontal: 'left', vertical: 'top' }
const iconMenuStyle = { paddingLeft: 10 }
const importMenuStyle = { paddingTop: 4 }

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  loginData,
  withHandlers({
    onClickColumnButtonData: ({ client, activeNodeArrayData }) => () => {
      const { activeNodeArray } = activeNodeArrayData
      const pathIsMain = ['Taxonomien', 'Eigenschaften-Sammlungen'].includes(
        activeNodeArray[0]
      )
      if (!pathIsMain) {
        app.history.push('/Taxonomien')
      }
    },
    onClickColumnButtonExport: ({ client }) => () =>
      app.history.push('/Export'),
    onClickImportPc: ({ client }) => () =>
      app.history.push('/Import/Eigenschaften-Sammlungen'),
    onClickImportRc: ({ client }) => () =>
      app.history.push('/Import/Beziehungs-Sammlungen'),
    onClickColumnButtonLogin: ({ client }) => () => app.history.push('/Login'),
    onChangeImportButton: ({ client }) => (event, key, value) =>
      app.history.push(`/Import/${value}`),
    ueberArteigenschaftenOnClick: () => () =>
      window.open('https://github.com/barbalex/ae2'),
  })
)

const MyAppBar = ({
  activeNodeArrayData,
  onClickColumnButtonData,
  onClickColumnButtonExport,
  onClickImportPc,
  onClickImportRc,
  onChangeImportButton,
  onClickColumnButtonLogin,
  ueberArteigenschaftenOnClick,
  loginData,
}: {
  activeNodeArrayData: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onClickImportPc: () => void,
  onClickImportRc: () => void,
  onChangeImportButton: () => void,
  onClickColumnButtonLogin: () => void,
  ueberArteigenschaftenOnClick: () => void,
  loginData: Object,
}) => {
  const activeNodeArray = activeNodeArrayData.activeNodeArray || []
  const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
  const url1 = activeNodeArray[1] && activeNodeArray[1].toLowerCase()
  let importDropdownValue = 'Import'
  if (url1 && url0 === 'import')
    importDropdownValue = `Import ${activeNodeArray[1]}`
  const login = get(loginData, 'login')
  const username = login && login.username ? login.username : null
  const loginLabel = username ? username : 'nicht angemeldet'

  return (
    <StyledAppBar
      title="Arteigenschaften"
      iconElementRight={
        <MenuDiv>
          <Button
            label="Daten"
            data-visible={
              !['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
            }
            onClick={onClickColumnButtonData}
          />
          <Button
            label="Export"
            data-visible={url0 !== 'export'}
            onClick={onClickColumnButtonExport}
          />
          <IconMenu
            iconButtonElement={
              <Button
                label={importDropdownValue}
                labelPosition="before"
                data-visible={url0 !== 'import'}
                icon={
                  <SymbolIcon
                    id="dropdownButtonSymbol"
                    className="material-icons"
                    data-visible={url0 !== 'import'}
                  >
                    expand_more
                  </SymbolIcon>
                }
              />
            }
            anchorOrigin={iconMenuAnchorOrigin}
            targetOrigin={iconMenuTargetOrigin}
            style={importMenuStyle}
          >
            <MenuItem
              primaryText="Eigenschaften-Sammlungen"
              onClick={onClickImportPc}
            />
            <MenuItem
              primaryText="Beziehungs-Sammlungen"
              onClick={onClickImportRc}
            />
          </IconMenu>
          <Button
            label={loginLabel}
            data-visible={url0 !== 'login'}
            onClick={onClickColumnButtonLogin}
          />
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
  )
}

export default enhance(MyAppBar)
