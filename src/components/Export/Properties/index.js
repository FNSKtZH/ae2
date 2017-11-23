// @flow
import React from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import HowTo from './HowTo'

const enhance = compose(
  withApollo,
  withHandlers({
    onCheck: () => (event, isChecked) => {},
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`

const Properties = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  onCheck,
}: {
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
  onCheck: () => void,
}) => {
  return (
    <Container>
      <HowTo />
    </Container>
  )
}

export default enhance(Properties)
