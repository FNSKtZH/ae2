import React, { useContext, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaBars, FaHome } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'gatsby'
import ErrorBoundary from 'react-error-boundary'
import ReactResizeDetector from 'react-resize-detector'
import { observer } from 'mobx-react-lite'

import storeContext from '../../../mobxStoreContext'
import getConstants from '../../../modules/constants'
import exists from '../../../modules/exists'

const constants = getConstants()

const StyledAppBar = styled(AppBar)`
  background-color: #e65100 !important;
  @media print {
    display: none !important;
  }
`
const SiteTitle = styled(Button)`
  display: none;
  color: white !important;
  font-size: 20px !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: unset !important;
  @media (min-width: 700px) {
    display: block;
  }
  &:hover {
    border-width: 1px !important;
  }
`
const Spacer = styled.div`
  flex-grow: 1;
`

const NavButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: ${props =>
    props.outlined === 'true' ? '1px !important' : '0 !important'};
  text-transform: none !important;
  &:hover {
    border-width: 1px !important;
  }
`

const HeaderDoku = () => {
  const { sidebarWidth, setSidebarWidth } = useContext(storeContext)
  const onResize = useCallback(
    width => {
      if (
        width > constants.sidebar.minimalWindowWidth &&
        exists(sidebarWidth)
      ) {
        setSidebarWidth(null)
      }
      if (
        width < constants.sidebar.minimalWindowWidth &&
        sidebarWidth === null
      ) {
        setSidebarWidth(0)
      }
    },
    [setSidebarWidth, sidebarWidth],
  )
  const onClickMenu = useCallback(() => {
    if (sidebarWidth === 0) {
      setSidebarWidth(constants.sidebar.width)
    }
    if (sidebarWidth > 0) {
      setSidebarWidth(0)
    }
  }, [setSidebarWidth, sidebarWidth])

  return (
    <ErrorBoundary>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <StyledAppBar position="fixed">
        <Toolbar>
          {exists(sidebarWidth) ? (
            <>
              <IconButton
                color="inherit"
                aria-label="Navigations-Baum öffnen"
                onClick={onClickMenu}
                title="Menü öffnen"
              >
                <FaBars />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Home"
                component={Link}
                to="/"
                title="Home"
              >
                <FaHome />
              </IconButton>
            </>
          ) : (
            <SiteTitle variant="outlined" component={Link} to="/" title="Home">
              Arteigenschaften
            </SiteTitle>
          )}
          <Spacer />
          <NavButton variant="outlined" component={Link} to="/">
            Daten
          </NavButton>
        </Toolbar>
      </StyledAppBar>
    </ErrorBoundary>
  )
}

export default observer(HeaderDoku)
