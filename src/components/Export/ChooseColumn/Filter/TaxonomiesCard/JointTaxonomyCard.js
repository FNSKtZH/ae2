// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import compose from 'recompose/compose'

import TaxField from '../TaxField'
import constants from '../../../../../modules/constants'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const Level3Card = styled(Card)`
  margin: 0;
  padding: 0;
`
const Level3CardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const Level3CardText = styled(CardText)`
  padding: 0 !important;
`
const Level3Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`
const PropertiesContainer = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const enhance = compose()

const TaxonomiesCard = ({
  jointTaxProperties,
}: {
  jointTaxProperties: Array<Object>,
}) => (
  <ErrorBoundary>
    <Level3Card key="jointTax">
      <Level3CardHeader
        title={
          <div>
            {`Gemeinsame Felder`}
            <Level3Count>{`(${jointTaxProperties.length})`}</Level3Count>
          </div>
        }
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={level2CardTitleStyle}
      />
      <Level3CardText expandable={true}>
        <PropertiesContainer data-width={window.innerWidth - 84}>
          {jointTaxProperties.map(field => (
            <TaxField
              key={`${field.propertyName}${field.jsontype}`}
              taxname="Taxonomie"
              pname={field.propertyName}
              jsontype={field.jsontype}
            />
          ))}
        </PropertiesContainer>
      </Level3CardText>
    </Level3Card>
  </ErrorBoundary>
)

export default enhance(TaxonomiesCard)
