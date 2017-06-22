// @flow
import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

const StyledAppBar = styled(AppBar)`
  @media print {
    display: none !important;
  }
`
const Button = styled(({ visible, ...rest }) => <FlatButton {...rest} />)`
  color: ${props =>
    props.visible
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
const iconMenuAnchorOrigin = { horizontal: 'left', vertical: 'bottom' }
const iconMenuTargetOrigin = { horizontal: 'left', vertical: 'top' }
const iconMenuStyle = { paddingLeft: 10 }

const enhance = compose(
  inject('store'),
  withHandlers({
    onClickColumnButtonData: props => () => {
      const pathIsMain = [
        'Taxonomien',
        'Eigenschaften-Sammlungen',
        'Beziehungs-Sammlungen',
      ].includes(props.store.activeNodeArray[0])
      if (!pathIsMain) {
        props.store.setActiveNodeArray(['Taxonomien'])
      }
    },
    onClickColumnButtonExport: props => () => {
      props.store.setActiveNodeArray(['Export'])
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
  onChangeImportButton,
  onClickColumnButtonLogin,
  ueberArteigenschaftenOnClick,
}: {
  store: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onChangeImportButton: () => void,
  onClickColumnButtonLogin: () => void,
  ueberArteigenschaftenOnClick: () => void,
}) => {
  const url0 =
    store.activeNodeArray[0] && store.activeNodeArray[0].toLowerCase()
  const url1 =
    store.activeNodeArray[1] && store.activeNodeArray[1].toLowerCase()
  let importDropdownValue = 'Import'
  if (url1 && url0 === 'import') importDropdownValue = store.activeNodeArray[1]
  const showImportDropdownValue = importDropdownValue === 'Import'

  return (
    <StyledAppBar
      title="Arteigenschaften"
      iconElementRight={
        <MenuDiv>
          <Button
            label="Daten"
            visible={
              ![
                'taxonomien',
                'eigenschaften-sammlungen',
                'beziehungs-sammlungen',
              ].includes(url0)
            }
            onClick={onClickColumnButtonData}
          />
          <Button
            label="Export"
            visible={url0 !== 'export'}
            onClick={onClickColumnButtonExport}
          />
          <DropDownMenu
            value={importDropdownValue}
            onChange={onChangeImportButton}
          >
            {showImportDropdownValue &&
              <MenuItem value={'Import'} primaryText="Import" />}
            <MenuItem
              value={'Eigenschaften-Sammlungen'}
              primaryText="Eigenschaften-Sammlungen"
            />
            <MenuItem
              value={'Beziehungs-Sammlungen'}
              primaryText="Beziehungs-Sammlungen"
            />
          </DropDownMenu>
          <Button
            label="Login"
            visible={url0 !== 'login'}
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
