import React from 'react'
import styled from 'styled-components'

import AllTaxChooser from './AllTaxChooser'
import TaxChooserList from './TaxChooserList'
import constants from '../../../../modules/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
`
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const JointTaxonomy = ({
  jointTaxProperties,
}) => {
  const width = typeof window !== 'undefined' ? window.innerWidth - 84 : 500

  return (
    <ErrorBoundary>
      <Container>
        <AllTaxChooser properties={jointTaxProperties} />
        <PropertiesContainer data-width={width}>
          <TaxChooserList properties={jointTaxProperties} />
        </PropertiesContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default JointTaxonomy
