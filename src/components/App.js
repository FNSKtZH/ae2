// @flow
import React from 'react'
import styled from 'styled-components'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import Data from './Data'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const enhance = compose(inject('store') /*, observer*/)

const App = ({ store, nodes }: { store: Object, nodes: Array<Object> }) =>
  <Container>
    <AppBar />
    <Data nodes={nodes} />
  </Container>

export default enhance(App)
