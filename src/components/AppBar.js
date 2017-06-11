// @flow
import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
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
    onClickColumnButtonTree: props => () =>
      props.store.ui.setColumnVisibility(
        'tree',
        !props.store.ui.visibleColumns.tree
      ),
    onClickColumnButtonData: props => () => {
      console.log('AppBar: clicked column button data')
      const pathIsMain = [
        'Taxonomien',
        'Eigenschaften-Sammlungen',
        'Beziehungs-Sammlungen',
      ].includes(props.store.activeNodeArray[0])
      console.log('AppBar: pathIsMain:', pathIsMain)
      const mainIsVisible = props.store.ui.visibleColumns.main
      console.log('AppBar: mainIsVisible:', mainIsVisible)
      if (!mainIsVisible) {
        props.store.ui.setColumnVisibility('main', true)
      }
      if (!pathIsMain) {
        props.store.setActiveNodeArray(['Taxonomien'])
      } else {
        props.store.ui.setColumnVisibility('main')
      }
    },
    onClickColumnButtonExport: props => () => {
      const mainIsVisible = props.store.ui.visibleColumns.main
      if (props.store.activeNodeArray[0] !== 'export') {
        props.store.setActiveNodeArray(['export'])
        if (!mainIsVisible) {
          props.store.ui.setColumnVisibility('main')
        }
      } else {
        props.store.setActiveNodeArray(['Taxonomien'])
      }
    },
    ueberArteigenschaftenOnClick: props => () =>
      window.open('https://github.com/barbalex/ae2'),
  }),
  observer
)

const MyAppBar = ({
  store,
  onClickColumnButtonTree,
  onClickColumnButtonData,
  onClickColumnButtonExport,
  ueberArteigenschaftenOnClick,
}: {
  store: Object,
  onClickColumnButtonTree: () => void,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  ueberArteigenschaftenOnClick: () => void,
}) =>
  <StyledAppBar
    title="Arteigenschaften"
    iconElementRight={
      <MenuDiv>
        <Button
          label="Strukturbaum"
          visible={store.ui.visibleColumns.tree}
          onClick={onClickColumnButtonTree}
        />
        <Button
          label="Daten"
          visible={
            store.ui.visibleColumns.main &&
            [
              'Taxonomien',
              'Eigenschaften-Sammlungen',
              'Beziehungs-Sammlungen',
            ].includes(store.activeNodeArray[0])
          }
          onClick={onClickColumnButtonData}
        />
        <Button
          label="Exporte"
          visible={store.activeNodeArray[0] === 'export'}
          onClick={onClickColumnButtonExport}
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

export default enhance(MyAppBar)
