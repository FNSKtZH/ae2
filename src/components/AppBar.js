// @flow
import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

const StyledAppBar = styled(AppBar)`
  @media print {
    display: none !important;
  }
`
const Button = styled(({ visible, ...rest }) => <FlatButton {...rest} />)`
  color: ${props => (props.visible ? 'rgb(255, 255, 255) !important' : 'rgba(255, 255, 255, 0.298039) !important')};
`
const TreeButton = styled(Button)`
  > div > span {
    padding-right: 6px !important;
  }
`
const DatenButton = styled(Button)`
  > div > span {
    padding-left: 6px !important;
  }
`
const MenuDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  > button {
    padding-top: 4px !important;
  }
`
const iconMenuAnchorOrigin = { horizontal: 'left', vertical: 'bottom' }
const iconMenuTargetOrigin = { horizontal: 'left', vertical: 'top' }
const iconMenuStyle = { paddingLeft: 10 }

const enhance = compose(
  withHandlers({
    onClickButton: props => name => {
      console.log('not yet implemented')
    },
    ueberArteigenschaftenOnClick: props => () =>
      window.open('https://github.com/barbalex/ae2'),
  }),
)

const MyAppBar = ({
  onClickButton,
  ueberArteigenschaftenOnClick,
}: {
  store: Object,
  onClickButton: () => void,
  ueberArteigenschaftenOnClick: () => void,
}) => {
  return (
    <StyledAppBar
      title="Arteigenschaften"
      iconElementRight={
        <MenuDiv>
          <TreeButton label="Strukturbaum" onClick={onClickButton} />
          <DatenButton label="Daten" onClick={onClickButton} />
          <Button label="Exporte" onClick={onClickButton} />
          <IconMenu
            iconButtonElement={
              <IconButton>
                <MoreVertIcon />
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
