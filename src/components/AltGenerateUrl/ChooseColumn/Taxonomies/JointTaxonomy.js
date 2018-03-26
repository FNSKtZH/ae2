// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import AllTaxChooser from './AllTaxChooser'
import TaxChooser from './TaxChooser'
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

const enhance = compose()

const JointTaxonomy = ({
  jointTaxProperties,
}: {
  jointTaxProperties: Array<Object>,
}) => (
  <ErrorBoundary>
    <Container>
      <AllTaxChooser properties={jointTaxProperties} />
      <PropertiesContainer data-width={window.innerWidth - 84}>
        {jointTaxProperties.map(field => (
          <TaxChooser
            key={`${field.propertyName}${field.jsontype}`}
            taxname={'Taxonomie'}
            pname={field.propertyName}
            jsontype={field.jsontype}
            count={field.count}
          />
        ))}
      </PropertiesContainer>
    </Container>
  </ErrorBoundary>
)

export default enhance(JointTaxonomy)
