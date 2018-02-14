import React from 'react'
import Menu, { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import LinkIcon from 'material-ui-icons/Link'
import Icon from 'material-ui/Icon'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  min-width: 50px !important;
  margin-right: -8px !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`

const ITEM_HEIGHT = 48

class LinkMenu extends React.Component {
  state = {
    anchorEl: null,
  }
  props = {
    taxonomy: Object,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { taxonomy } = this.props

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
            <LinkIcon />
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
            onClick={() => {
              console.log('taxonomy:', taxonomy)
              window.open('https://github.com/barbalex/ae2')
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
