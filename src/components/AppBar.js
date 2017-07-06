// @flow
import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

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
  inject('store'),
  withHandlers({
    onClickColumnButtonData: props => () => {
      const pathIsMain = ['Taxonomien', 'Eigenschaften-Sammlungen'].includes(
        props.store.activeNodeArray[0]
      )
      if (!pathIsMain) {
        props.store.setActiveNodeArray(['Taxonomien'])
      }
    },
    onClickColumnButtonExport: props => () => {
      props.store.setActiveNodeArray(['Export'])
    },
    onClickImportPc: props => () => {
      props.store.setActiveNodeArray(['Import', 'Eigenschaften-Sammlungen'])
    },
    onClickImportRc: props => () => {
      props.store.setActiveNodeArray(['Import', 'Beziehungs-Sammlungen'])
    },
    onClickColumnButtonLogin: props => () => {
      props.store.setActiveNodeArray(['Login'])
    },
    onChangeImportButton: props => (event, key, value) => {
      console.log('event:', event)
      console.log('value:', value)
      props.store.setActiveNodeArray(['Import', value])
    },
    ueberArteigenschaftenOnClick: props => () =>
      window.open('https://github.com/barbalex/ae2'),
  }),
  observer
)

const MyAppBar = ({
  store,
  onClickColumnButtonData,
  onClickColumnButtonExport,
  onClickImportPc,
  onClickImportRc,
  onChangeImportButton,
  onClickColumnButtonLogin,
  ueberArteigenschaftenOnClick,
}: {
  store: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onClickImportPc: () => void,
  onClickImportRc: () => void,
  onChangeImportButton: () => void,
  onClickColumnButtonLogin: () => void,
  ueberArteigenschaftenOnClick: () => void,
}) => {
  const url0 =
    store.activeNodeArray[0] && store.activeNodeArray[0].toLowerCase()
  const url1 =
    store.activeNodeArray[1] && store.activeNodeArray[1].toLowerCase()
  let importDropdownValue = 'Import'
  if (url1 && url0 === 'import')
    importDropdownValue = `Import ${store.activeNodeArray[1]}`

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
              onTouchTap={onClickImportPc}
            />
            <MenuItem
              primaryText="Beziehungs-Sammlungen"
              onTouchTap={onClickImportRc}
            />
          </IconMenu>
          <Button
            label="Login"
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
              onTouchTap={ueberArteigenschaftenOnClick}
            />
          </IconMenu>
        </MenuDiv>
      }
      showMenuIconButton={false}
    />
  )
}

export default enhance(MyAppBar)
