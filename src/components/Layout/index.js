/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import AppBar from './AppBar'
//import Fallback from '../shared/Fallback'

const Container = styled.div`
  @media print {
    height: auto;
    overflow: visible !important;
  }
`

const Layout = ({ children }) => (
    <Container>
      <Helmet
        title="arteigenschaften"
        meta={[
          {
            name: 'description',
            content: 'Arteigenschaften sammeln',
          },
          {
            name: 'keywords',
            content: 'Naturschutz, Artenschutz, Flora, Pflanzen, Pilze, Moose',
          },
        ]}
      >
        <html lang="de" />
      </Helmet>
      <AppBar />
      {children}
    </Container>
  )

export default Layout
