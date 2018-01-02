// @flow
import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu'

const DynamicMenu = ({ id, trigger }) => {
  const handleItemClick = trigger ? trigger.onItemClick : null

  return (
    <ContextMenu id={id} collect={props => props}>
      <div className="react-contextmenu-title">Benutzer</div>
      <MenuItem
        onClick={handleItemClick}
        data={{
          action: 'insert',
          table: 'user',
        }}
      >
        erstelle neuen
      </MenuItem>
      <MenuItem
        onClick={handleItemClick}
        data={{
          action: 'delete',
          table: 'user',
        }}
      >
        lösche
      </MenuItem>
    </ContextMenu>
  )
}

const ConnectedMenu = connectMenu('CmBenutzer')(DynamicMenu)

export default ConnectedMenu
