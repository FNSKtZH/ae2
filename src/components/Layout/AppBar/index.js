import React, { useState, useCallback, useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Icon from '@material-ui/core/Icon'
import ShareIcon from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'
import { navigate } from 'gatsby'
import loadable from '@loadable/component'
import { Location } from '@reach/router'
import ReactResizeDetector from 'react-resize-detector'

import getActiveObjectIdFromNodeArray from '../../../modules/getActiveObjectIdFromNodeArray'
import mobxStoreContext from '../../../mobxStoreContext'
import ErrorBoundary from '../../shared/ErrorBoundary'

// ReactDOMServer does not yet support Suspense
//const MoreMenu = lazy(() => import('./MoreMenu'))
const MoreMenu = loadable(() => import('./MoreMenu'))

/**
 * For unknown reason appbar does not follow display flex when
 * user form is shown: user covers appbar!!??
 * Container with display block is needed to prevent that
 */
const Container = styled.div`
  display: block;
`
const StyledAppBar = styled(AppBar)`
  background-color: #e65100 !important;
  @media print {
    display: none !important;
  }
`
const StyledToolbar = styled(Toolbar)`
  flex-wrap: nowrap;
`
const Buttons = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`
const StyledTypography = styled(Typography)`
  flex: 1;
  width: 200px;
  color: white !important;
  margin-right: 12px !important;
  hyphens: manual;
`
const StyledButton = styled(Button)`
  color: rgb(255, 255, 255) !important;
  border: ${(props) =>
    props['data-active'] ? '1px solid !important' : 'none'};
  margin: 8px;
  hyphens: manual;
  white-space: nowrap;
`
const LoginButton = styled(StyledButton)`
  min-width: ${(props) =>
    props['data-widelayout'] ? 'inherit' : '40px !important'};
  max-width: ${(props) => (props['data-widelayout'] ? 'inherit' : '40px')};
`
const ShareButton = styled(StyledButton)`
  min-width: 40px !important;
  max-width: 40px;
  padding-top: 0 !important;
  .MuiIcon-root {
    height: 30px;
  }
`
const StyledMoreVertIcon = styled(ShareIcon)`
  color: white !important;
`
const getInitials = (name) => name.match(/\b(\w)/g).join('')

const query = gql`
  query ObjectQuery(
    $objectId: UUID!
    $existsObjectId: Boolean!
    $pCId: UUID!
    $existsPCId: Boolean!
    $taxId: UUID!
    $existsTaxId: Boolean!
  ) {
    objectById(id: $objectId) @include(if: $existsObjectId) {
      id
      name
    }
    propertyCollectionById(id: $pCId) @include(if: $existsPCId) {
      id
      name
    }
    taxonomyById(id: $taxId) @include(if: $existsTaxId) {
      id
      name
    }
  }
`

const Header = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { login } = mobxStore
  const activeNodeArray = mobxStore.activeNodeArray.toJS()

  const objectId = getActiveObjectIdFromNodeArray(activeNodeArray)
  let pCId = '99999999-9999-9999-9999-999999999999'
  if (activeNodeArray[0] === 'Eigenschaften-Sammlungen' && activeNodeArray[1]) {
    pCId = activeNodeArray[1]
  }
  const existsPCId = pCId !== '99999999-9999-9999-9999-999999999999'
  let taxId = '99999999-9999-9999-9999-999999999999'
  if (
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0]) &&
    activeNodeArray[1]
  ) {
    taxId = activeNodeArray[1]
  }
  const existsTaxId = taxId !== '99999999-9999-9999-9999-999999999999'
  const { data, error: dataError } = useQuery(query, {
    variables: {
      objectId: objectId || '99999999-9999-9999-9999-999999999999',
      existsObjectId: !!objectId,
      pCId,
      existsPCId,
      taxId,
      existsTaxId,
    },
  })

  const [wide, setWide] = useState(false)
  const onResize = useCallback(
    (width) => {
      if (width > 700 && !wide) {
        setWide(true)
      }
      if (width < 700 && wide) {
        setWide(false)
      }
    },
    [wide],
  )

  const url0 = activeNodeArray[0] && activeNodeArray[0].toLowerCase()
  const { username } = login
  const loginLabel = username
    ? wide
      ? username
      : getInitials(username)
    : wide
    ? 'Login'
    : 'n.a.'
  const loginTitle = username ? 'abmelden' : 'anmelden'
  const objektName = get(data, 'objectById.name')
  const pCName = get(data, 'propertyCollectionById.name')
  const taxName = get(data, 'taxonomyById.name')

  const onClickColumnButtonDocs = useCallback(() => {
    navigate('/Dokumentation')
  }, [])
  const onClickColumnButtonData = useCallback(() => {
    navigate('/')
  }, [])
  const onClickColumnButtonExport = useCallback(() => {
    navigate('/Export')
  }, [])
  const onClickColumnButtonLogin = useCallback(() => {
    navigate('/Login')
  }, [])
  const onClickShare = useCallback(() => {
    const name = pCName
      ? pCName
      : objektName
      ? `${taxName}: ${objektName}`
      : taxName
      ? taxName
      : url0
      ? url0
      : ''
    const title = `arteigenschaften.ch${!!name ? ': ' : ''}${name}`
    typeof window !== 'undefined' &&
      navigator.share({
        title,
        url: window.location.href,
      })
  }, [pCName, objektName, taxName, url0])

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location
        const pathArray = pathname.split('/').filter((a) => !!a)

        if (dataError) return `Error fetching data: ${dataError.message}`

        return (
          <ErrorBoundary>
            <Container>
              <ReactResizeDetector handleWidth onResize={onResize} />
              <StyledAppBar position="static">
                <div>
                  <StyledToolbar>
                    {wide ? (
                      <StyledTypography variant="h6" color="inherit">
                        Arteigenschaften
                      </StyledTypography>
                    ) : (
                      <div />
                    )}
                    <Buttons>
                      <div>
                        <StyledButton
                          data-active={
                            [
                              'Arten',
                              'Lebensräume',
                              'Lebensr%C3%A4ume',
                              'Eigenschaften-Sammlungen',
                              'Benutzer',
                              'Organisationen',
                            ].includes(pathArray[0]) || pathArray.length === 0
                          }
                          onClick={onClickColumnButtonData}
                        >
                          Daten
                        </StyledButton>
                      </div>
                      <div>
                        <StyledButton
                          data-active={pathname === '/Export'}
                          onClick={onClickColumnButtonExport}
                        >
                          Export
                        </StyledButton>
                      </div>
                      <div>
                        <LoginButton
                          data-active={pathname === '/Login'}
                          data-widelayout={wide}
                          onClick={onClickColumnButtonLogin}
                          title={loginTitle}
                        >
                          {loginLabel}
                        </LoginButton>
                      </div>
                      {typeof navigator !== 'undefined' &&
                        navigator.share !== undefined && (
                          <>
                            <ShareButton
                              aria-label="teilen"
                              onClick={onClickShare}
                            >
                              <Icon>
                                <StyledMoreVertIcon />
                              </Icon>
                            </ShareButton>
                          </>
                        )}
                      <div>
                        <StyledButton
                          data-active={pathname.includes('/Dokumentation')}
                          onClick={onClickColumnButtonDocs}
                        >
                          Dokumentation
                        </StyledButton>
                      </div>
                      <div>
                        <MoreMenu />
                      </div>
                    </Buttons>
                  </StyledToolbar>
                </div>
              </StyledAppBar>
            </Container>
          </ErrorBoundary>
        )
      }}
    </Location>
  )
}

export default observer(Header)
