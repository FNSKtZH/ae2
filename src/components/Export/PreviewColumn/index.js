// @flow
import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import OptionsChoosen from './OptionsChoosen'
import Preview from './Preview'
import ErrorBoundary from '../../shared/ErrorBoundary'
import mobxStoreContext from '../../../mobxStoreContext'

const Container = styled.div`
  padding: 5px 0;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
`

const Filter = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxonomies: exportTaxonomies } = mobxStore.export

  return (
    <ErrorBoundary>
      <Container>
        <OptionsChoosen />
        <Preview />
        {exportTaxonomies.length === 0 && (
          <HowToDiv>
            Sobald eine Taxonomie gewählt ist, werden hier Daten angezeigt.
          </HowToDiv>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Filter)
