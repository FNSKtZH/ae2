// @flow
import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu'

const DynamicMenu = ({ id, trigger }) => {
  const handleItemClick = trigger ? trigger.onItemClick : null
  const nodeLabel = trigger ? trigger.nodeLabel : ''

  return (
    <ContextMenu id={id} collect={props => props}>
      <div className="react-contextmenu-title">{nodeLabel}</div>
      <MenuItem
        onClick={handleItemClick}
        data={{
          action: 'insert',
          table: 'taxonomy',
        }}
      >
        erstelle neue Taxonomie
      </MenuItem>
    </ContextMenu>
  )
}

const ConnectedMenu = connectMenu('CmType')(DynamicMenu)

export default ConnectedMenu
