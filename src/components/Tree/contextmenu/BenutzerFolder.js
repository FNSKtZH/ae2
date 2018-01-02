// @flow
import React from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import compose from 'recompose/compose'

const enhance = compose()

const BenutzerFolder = ({ onClick }: { onClick: () => void }) => (
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
  </ContextMenu>
)

export default enhance(BenutzerFolder)
