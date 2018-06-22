import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import LinkIcon from '@material-ui/icons/Link'
import Icon from '@material-ui/core/Icon'
import styled from 'styled-components'
import get from 'lodash/get'

const StyledButton = styled(Button)`
  min-width: 54px !important;
  max-width: 54px !important;
  min-height: 48px !important;
  margin-right: -8px !important;
  border-radius: 80px !important;
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
    const props = JSON.parse(get(objekt, 'properties', {})) || {}
    const gattung = get(props, 'Gattung')
    const art = get(props, 'Art')
    const taxName = get(objekt, 'taxonomyByTaxonomyId.name')
    const isFlora = taxName.toLowerCase().includes('sisf')

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
              const nameDeutsch = get(props, 'Name Deutsch', null)
              const einheit = get(props, 'Einheit', null)
              const url = einheit
                ? `https://www.google.ch/search?tbm=isch&q=${einheit}`
                : `https://www.google.ch/search?tbm=isch&q="${objekt.name}"${
                    nameDeutsch ? `+OR+"${nameDeutsch}"` : ''
                  }`
              window.open(url)
              this.setState({ anchorEl: null })
            }}
          >
            Bilder googeln
          </MenuItem>
          <MenuItem
            key="wikipedia"
            onClick={event => {
              event.stopPropagation()
              const nameDeutsch = get(props, 'Name Deutsch', null)
              const einheit = get(props, 'Einheit', null)
              const url = einheit
                ? `https://www.google.ch/search?q=${einheit} site:wikipedia.org`
                : nameDeutsch
                  ? `https://www.google.ch/search?q="${nameDeutsch}"+OR+"${
                      objekt.name
                    }" site:wikipedia.org`
                  : `https://www.google.ch/search?q="${
                      objekt.name
                    }" site:wikipedia.org`
              window.open(url)
              this.setState({ anchorEl: null })
            }}
          >
            Wikipedia-Artikel suchen
          </MenuItem>
          {gattung &&
            art && (
              <MenuItem
                key="gbif"
                onClick={event => {
                  event.stopPropagation()
                  const url = `https://www.gbif.org/species/search?q=${encodeURIComponent(
                    `${gattung} ${art}`
                  )}`
                  window.open(url)
                  this.setState({ anchorEl: null })
                }}
              >
                Im GBIF suchen
              </MenuItem>
            )}
          {isFlora &&
            gattung &&
            art && (
              <MenuItem
                key="infoflora"
                onClick={event => {
                  event.stopPropagation()
                  const url = `https://www.infoflora.ch/de/flora/${`${gattung.toLowerCase()}-${art.toLowerCase()}.html`}`
                  window.open(url)
                  this.setState({ anchorEl: null })
                }}
              >
                Bei Info Flora suchen
              </MenuItem>
            )}
        </Menu>
      </div>
    )
  }
}

export default LinkMenu
