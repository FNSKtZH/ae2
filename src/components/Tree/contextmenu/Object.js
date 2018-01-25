// @flow
import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu'

const DynamicMenu = ({ id, trigger }) => {
  const handleItemClick = trigger ? trigger.onItemClick : null

  return (
    <ContextMenu id={id} collect={props => props}>
      <div className="react-contextmenu-title">Art/Lebensraum</div>
      <MenuItem
        onClick={handleItemClick}
        data={{
          action: 'insert',
          table: 'object',
        }}
      >
        erstelle neu (eine Ebene tiefer)
      </MenuItem>
      <MenuItem
        onClick={handleItemClick}
        data={{
          action: 'delete',
          table: 'object',
        }}
      >
        lösche
      </MenuItem>
    </ContextMenu>
  )
}

const ConnectedMenu = connectMenu('CmObject')(DynamicMenu)

export default ConnectedMenu
