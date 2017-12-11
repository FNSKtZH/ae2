// @flow
import React from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'

import HowTo from './HowTo'
import OptionsChoosen from './OptionsChoosen'
import Preview from './Preview'

const enhance = compose(withApollo)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`

const Filter = () => {
  return (
    <Container>
      <HowTo />
      <OptionsChoosen />
      <Preview />
    </Container>
  )
}

export default enhance(Filter)
