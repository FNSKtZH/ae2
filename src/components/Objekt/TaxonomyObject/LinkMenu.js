import React from 'react'
import Menu, { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import LinkIcon from 'material-ui-icons/Link'
import Icon from 'material-ui/Icon'
import styled from 'styled-components'
import get from 'lodash/get'

const StyledButton = styled(Button)`
  min-width: 50px !important;
  margin-right: -8px !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`
const StyledLinkIcon = styled(LinkIcon)`
  color: rgba(0, 0, 0, 0.54);
`

const ITEM_HEIGHT = 48

type Props = {
  objekt: Object,
}

type State = {
  anchorEl: Object,
}

class LinkMenu extends React.Component<Props, State> {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { objekt } = this.props

    return (
      <div>
        <StyledButton
          aria-label="Externe Links"
          title="Externe Links"
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={event => {
            event.stopPropagation()
            this.handleClick(event)
          }}
        >
          <Icon>
            <StyledLinkIcon />
          </Icon>
        </StyledButton>
        <Menu
          id="menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          <MenuItem
            key="googleBilder"
            onClick={event => {
              event.stopPropagation()
              const props = JSON.parse(get(objekt, 'properties', {})) || {}
              const nameDeutsch = get(props, 'Name Deutsch', null)
              const url = `https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="${
                objekt.name
              }"${nameDeutsch ? `+OR+"${nameDeutsch}"` : ''}`
              window.open(url)
            }}
          >
            Bilder suchen mit Google
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default LinkMenu
