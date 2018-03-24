import React from 'react'
import Icon from 'material-ui/Icon'
import Menu, { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import styled from 'styled-components'

const StyledMoreVertIcon = styled(MoreVertIcon)`
  color: white !important;
`
const StyledButton = styled(Button)`
  min-width: 50px !important;
  margin-right: -8px !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`

const ITEM_HEIGHT = 48

class MoreMenu extends React.Component {
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

    return (
      <div>
        <StyledButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          title="Mehr..."
        >
          <Icon>
            <StyledMoreVertIcon />
          </Icon>
        </StyledButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 250,
            },
          }}
        >
          <MenuItem
            key="ueber"
            onClick={() => {
              window.open('https://github.com/barbalex/ae2')
              this.setState({ anchorEl: null })
            }}
          >
            über arteigenschaften.ch
          </MenuItem>
          <MenuItem
            key="melden"
            onClick={() => {
              window.open('https://github.com/barbalex/ae2/issues')
              this.setState({ anchorEl: null })
            }}
          >
            Fehler oder Wünsche melden
          </MenuItem>
          {/*<MenuItem
            key="datagraph"
            onClick={() => {
              app.history.push('/datagraph')
              this.setState({ anchorEl: null })
            }}
          >
            GrahpQL-Struktur anzeigen
          </MenuItem>
          <MenuItem
            key="graphiql"
            onClick={() => {
              app.history.push('/graphiql')
              this.setState({ anchorEl: null })
            }}
          >
            GrahpQL-Abfragetool anzeigen
          </MenuItem>*/}
        </Menu>
      </div>
    )
  }
}

export default MoreMenu
