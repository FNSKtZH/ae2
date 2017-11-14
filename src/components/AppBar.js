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
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import activeNodeArrayMutation from '../modules/activeNodeArrayMutation'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'

const StyledAppBar = styled(AppBar)`@media print {display: none !important;}`
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
const StyledMoreVertIcon = styled(MoreVertIcon)`color: white !important;`
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

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const enhance = compose(
  inject('store'),
  withApollo,
  activeNodeArrayData,
  withHandlers({
    onClickColumnButtonData: props => () => {
      const { client, activeNodeArrayData } = props
      const activeNodeArray =
        activeNodeArrayData && activeNodeArrayData.activeNodeArray[0].value
      const pathIsMain = ['Taxonomien', 'Eigenschaften-Sammlungen'].includes(
        activeNodeArray[0]
      )
      if (!pathIsMain) {
        client.mutate({
          mutation: activeNodeArrayMutation,
          variables: { value: ['Taxonomien'] },
        })
      }
    },
    onClickColumnButtonExport: props => () => {
      const { client } = props
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: { value: ['Export'] },
      })
    },
    onClickImportPc: props => () => {
      const { client } = props
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: { value: ['Import', 'Eigenschaften-Sammlungen'] },
      })
    },
    onClickImportRc: props => () => {
      const { client } = props
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: { value: ['Import', 'Beziehungs-Sammlungen'] },
      })
    },
    onClickColumnButtonLogin: props => () => {
      const { client } = props
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: { value: ['Login'] },
      })
    },
    onChangeImportButton: props => (event, key, value) => {
      const { client } = props
      console.log('event:', event)
      console.log('value:', value)
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: { value: ['Import', value] },
      })
    },
    ueberArteigenschaftenOnClick: props => () =>
      window.open('https://github.com/barbalex/ae2'),
  }),
  observer
)

const MyAppBar = ({
  store,
  activeNodeArrayData,
  onClickColumnButtonData,
  onClickColumnButtonExport,
  onClickImportPc,
  onClickImportRc,
  onChangeImportButton,
  onClickColumnButtonLogin,
  ueberArteigenschaftenOnClick,
}: {
  store: Object,
  activeNodeArrayData: Object,
  onClickColumnButtonData: () => void,
  onClickColumnButtonExport: () => void,
  onClickImportPc: () => void,
  onClickImportRc: () => void,
  onChangeImportButton: () => void,
  onClickColumnButtonLogin: () => void,
  ueberArteigenschaftenOnClick: () => void,
}) => {
  const activeNodeArray =
    activeNodeArrayData && activeNodeArrayData.activeNodeArray[0].value
  const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
  const url1 = activeNodeArray[1] && activeNodeArray[1].toLowerCase()
  let importDropdownValue = 'Import'
  if (url1 && url0 === 'import')
    importDropdownValue = `Import ${activeNodeArray[1]}`

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
