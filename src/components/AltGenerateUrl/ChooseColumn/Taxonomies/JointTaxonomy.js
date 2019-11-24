import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import ReactResizeDetector from 'react-resize-detector'

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
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const JointTaxonomy = ({ jointTaxProperties }) => {
  const [wide, setWide] = useState(false)
  const onResize = useCallback(
    width => {
      if (width > 700 && !wide) {
        setWide(true)
      }
      if (width < 700 && wide) {
        setWide(false)
      }
    },
    [wide],
  )
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
