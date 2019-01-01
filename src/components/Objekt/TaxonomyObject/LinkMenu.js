import React, { useState, useCallback } from 'react'
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

const LinkMenu = ({ objekt }: { objekt: Object }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const props = JSON.parse(get(objekt, 'properties', {})) || {}
  const nameDeutsch = get(props, 'Name Deutsch', null)
  const einheit = get(props, 'Einheit', null)
  const gattung = get(props, 'Gattung')
  const art = get(props, 'Art')
  const taxName = get(objekt, 'taxonomyByTaxonomyId.name')
  const isFlora = taxName.toLowerCase().includes('sisf')
  const paperProps = {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
      width: 200,
    },
  }

  const onClickIcon = useCallback(e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  })
  const handleClose = useCallback(() => setAnchorEl(null))
  const onClickGoogleImages = useCallback(
    e => {
      e.stopPropagation()
      const url = einheit
        ? `https://www.google.ch/search?tbm=isch&q=${einheit}`
        : `https://www.google.ch/search?tbm=isch&q="${objekt.name}"${
            nameDeutsch ? `+OR+"${nameDeutsch}"` : ''
          }`
      window.open(url)
      setAnchorEl(null)
    },
    [objekt],
  )
  const onClickWikepedia = useCallback(
    e => {
      e.stopPropagation()
      const url = einheit
        ? `https://www.google.ch/search?q=${einheit} site:wikipedia.org`
        : nameDeutsch
        ? `https://www.google.ch/search?q="${nameDeutsch}"+OR+"${
            objekt.name
          }" site:wikipedia.org`
        : `https://www.google.ch/search?q="${objekt.name}" site:wikipedia.org`
      window.open(url)
      setAnchorEl(null)
    },
    [objekt],
  )
  const onClickGbif = useCallback(
    e => {
      e.stopPropagation()
      const url = `https://www.gbif.org/species/search?q=${encodeURIComponent(
        `${gattung} ${art}`,
      )}`
      window.open(url)
      setAnchorEl(null)
    },
    [objekt],
  )
  const onClickInfoflora = useCallback(
    e => {
      e.stopPropagation()
      const url = `https://www.infoflora.ch/de/flora/${`${gattung.toLowerCase()}-${art.toLowerCase()}.html`}`
      window.open(url)
      setAnchorEl(null)
    },
    [objekt],
  )

  return (
    <div>
      <StyledButton
        aria-label="Externe Links"
        title="Externe Links"
        aria-owns={anchorEl ? 'menu' : null}
        aria-haspopup="true"
        onClick={onClickIcon}
      >
        <Icon>
          <StyledLinkIcon />
        </Icon>
      </StyledButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={paperProps}
      >
        <MenuItem key="googleBilder" onClick={onClickGoogleImages}>
          Bilder googeln
        </MenuItem>
        <MenuItem key="wikipedia" onClick={onClickWikepedia}>
          Wikipedia-Artikel suchen
        </MenuItem>
        {gattung && art && (
          <MenuItem key="gbif" onClick={onClickGbif}>
            Im GBIF suchen
          </MenuItem>
        )}
        {isFlora && gattung && art && (
          <MenuItem key="infoflora" onClick={onClickInfoflora}>
            Bei Info Flora suchen
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

export default LinkMenu
