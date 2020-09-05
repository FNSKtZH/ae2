import React from 'react'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import ErrorBoundary from '../../../../modules/ErrorBoundary'
import AllTaxChooser from './AllTaxChooser'
import TaxChooserList from './TaxChooserList'
import getConstants from '../../../../modules/constants'
const constants = getConstants()

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
`
const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const JointTaxonomy = ({ jointTaxProperties, width = 500 }) => {
  const columns = Math.floor(width / constants.export.properties.columnWidth)

  return (
    <ErrorBoundary>
      <Container>
        <AllTaxChooser properties={jointTaxProperties} />
        <PropertiesContainer>
          <TaxChooserList properties={jointTaxProperties} columns={columns} />
        </PropertiesContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(JointTaxonomy)
