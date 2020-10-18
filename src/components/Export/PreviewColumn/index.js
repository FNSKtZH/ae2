import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'
import { withResizeDetector } from 'react-resize-detector'

import OptionsChoosen from './OptionsChoosen'
import Preview from './Preview'
import mobxStoreContext from '../../../mobxStoreContext'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  padding: 5px 0;
`
const HowToDiv = styled.div`
  padding: 15px 10px 0 10px;
`

const Filter = ({ height }) => {
  const mobxStore = useContext(mobxStoreContext)
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  return (
    <ErrorBoundary>
      <SimpleBar style={{ maxHeight: height, height: '100%' }}>
        <Container>
          <OptionsChoosen />
          <Preview />
          {exportTaxonomies.length === 0 && (
            <HowToDiv>
              Sobald eine Taxonomie gewählt ist, werden hier Daten angezeigt.
            </HowToDiv>
          )}
        </Container>
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Filter))
