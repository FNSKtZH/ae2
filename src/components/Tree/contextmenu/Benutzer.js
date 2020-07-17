import React from 'react'

import {
  ContextMenu,
  MenuItem,
  connectMenu,
} from '../../../modules/react-contextmenu'

const dataInsert = {
  action: 'insert',
  table: 'user',
}
const dataDelete = {
  action: 'delete',
  table: 'user',
}

const DynamicMenu = ({ id, trigger }) => {
  const handleItemClick = trigger ? trigger.onItemClick : null

  return (
    <ContextMenu id={id} collect={(props) => props}>
      <div className="react-contextmenu-title">Benutzer</div>
      <MenuItem onClick={handleItemClick} data={dataInsert}>
        erstelle neuen
      </MenuItem>
      <MenuItem onClick={handleItemClick} data={dataDelete}>
        lösche
      </MenuItem>
    </ContextMenu>
  )
}

const ConnectedMenu = connectMenu('CmBenutzer')(DynamicMenu)

export default ConnectedMenu
