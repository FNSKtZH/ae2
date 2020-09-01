import React, { useCallback, useState } from 'react'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import relations from '../../../modules/relations.png'

const StyledMoreVertIcon = styled(MoreVertIcon)`
  color: white !important;
`
const StyledButton = styled(Button)`
  min-width: 50px !important;
  margin-right: -8px !important;
  min-height: 36px;
  :hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
  /*2019 08 20: no idea why height suddenly is too small*/
  span {
    height: 36px;
  }
`
const Version = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`
const TwoLineMenuItem = styled(MenuItem)`
  line-height: 1.3 !important;
`

const ITEM_HEIGHT = 48
const paperProps = {
  style: {
    maxHeight: ITEM_HEIGHT * 7,
    width: 295,
  },
}

const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const onClickButton = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const onClose = useCallback(() => {
    setAnchorEl(null)
  }, [])
  const onClickUeber = useCallback(() => {
    navigate('/Dokumentation/Projektbeschreibung')
    setAnchorEl(null)
  }, [])
  const onClickStruktur = useCallback(() => {
    setAnchorEl(null)
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(relations, '_blank', 'toolbar=no')
      }
      window.open(relations)
    }
  }, [])
  const onClickMelden = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://github.com/FNSKtZH/ae2/issues')
    setAnchorEl(null)
  }, [])
  const onClickFelderAlt = useCallback(() => {
    navigate('/artenlistentool/waehlen')
    setAnchorEl(null)
  }, [])
  const onClickGqlQuery = useCallback(() => {
    navigate('/graphiql')
    setAnchorEl(null)
  }, [])

  return (
    <div>
      <StyledButton
        aria-label="More"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        onClick={onClickButton}
        title="Mehr..."
      >
        <Icon>
          <StyledMoreVertIcon />
        </Icon>
      </StyledButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={paperProps}
      >
        <MenuItem key="ueber" onClick={onClickUeber}>
          über arteigenschaften.ch
        </MenuItem>
        <MenuItem key="relations" onClick={onClickStruktur}>
          Daten-Struktur
        </MenuItem>
        <MenuItem key="melden" onClick={onClickMelden}>
          Fehler oder Wünsche melden
        </MenuItem>
        <MenuItem key="alt" onClick={onClickFelderAlt}>
          Felder für das Artenlistentool wählen
        </MenuItem>
        <TwoLineMenuItem key="graphiql" onClick={onClickGqlQuery}>
          GrahpQL-Abfragetool
          <br />
          inkl. Schnittstellen-Dokumentation
        </TwoLineMenuItem>
        <Version>Version: 1.4.15 vom 1.09.2020</Version>
      </Menu>
    </div>
  )
}

export default MoreMenu
