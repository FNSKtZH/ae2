// @flow
import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu'

const data = {
  action: 'insert',
  table: 'user',
}

const DynamicMenu = ({ id, trigger }) => {
  const handleItemClick = trigger ? trigger.onItemClick : null

  return (
    <ContextMenu id={id} collect={props => props}>
      <div className="react-contextmenu-title">Benutzer</div>
      <MenuItem onClick={handleItemClick} data={data}>
        erstelle neuen
      </MenuItem>
    </ContextMenu>
  )
}

const ConnectedMenu = connectMenu('CmBenutzerFolder')(DynamicMenu)

export default ConnectedMenu
