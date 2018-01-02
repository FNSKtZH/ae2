// @flow
import React from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import compose from 'recompose/compose'

const enhance = compose()

const Benutzer = ({ onClick }: { onClick: () => void }) => (
  <ContextMenu id="CmBenutzerFolder" collect={props => props}>
    <div className="react-contextmenu-title">Art</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: 'insert',
        table: 'user',
      }}
    >
      erstelle neuen
    </MenuItem>
    <MenuItem
      onClick={onClick}
      data={{
        action: 'delete',
        table: 'user',
      }}
    >
      lösche
    </MenuItem>
  </ContextMenu>
)

export default enhance(Benutzer)
