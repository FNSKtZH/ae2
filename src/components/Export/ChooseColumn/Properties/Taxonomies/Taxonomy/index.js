// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import AllTaxChooser from '../../AllTaxChooser'
import TaxChooser from '../../TaxChooser'
import constants from '../../../../../../modules/constants'
import propsByTaxData from '../../../propsByTaxData'
import exportTaxonomiesData from '../../../../exportTaxonomiesData'
import data from '../../data'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const Level3Card = styled(Card)`
  margin: 0;
  padding: 0;
`
const Level3CardHeader = styled(CardHeader)`
  background-color: #fff3e0;
  border-bottom: 1px solid #ebebeb;
`
const Level3CardText = styled(CardText)`
  display: flex;
  flex-direction: column;
`
const PropertiesContainer = styled.div`
  column-width: ${props =>
    props['data-width'] > 2 * constants.export.properties.columnWidth
      ? `${constants.export.properties.columnWidth}px`
      : 'auto'};
`
const Level3Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const level2CardTitleStyle = { fontWeight: 'bold' }

const enhance = compose(exportTaxonomiesData, data, propsByTaxData)

const Properties = ({
  propsByTaxData,
  data,
  tax,
}: {
  propsByTaxData: Object,
  data: Object,
  tax: Object,
}) => {
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    []
  )
  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')

  return (
    <ErrorBoundary>
      <Level3Card key={tax}>
        <Level3CardHeader
          title={
            <div>
              {tax}
              <Level3Count>{`(${taxPropertiesByTaxonomy[tax].length} ${
                taxPropertiesByTaxonomy[tax].length === 1 ? 'Feld' : 'Felder'
              })`}</Level3Count>
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level2CardTitleStyle}
        />
        <Level3CardText expandable={true}>
          {taxPropertiesByTaxonomy[tax].length > 1 && (
            <AllTaxChooser properties={taxPropertiesByTaxonomy[tax]} />
          )}
          <PropertiesContainer data-width={window.innerWidth - 84}>
            {taxPropertiesByTaxonomy[tax].map(field => (
              <TaxChooser
                key={`${field.propertyName}${field.jsontype}`}
                taxname={field.taxonomyName}
                pname={field.propertyName}
                jsontype={field.jsontype}
                count={field.count}
              />
            ))}
          </PropertiesContainer>
        </Level3CardText>
      </Level3Card>
    </ErrorBoundary>
  )
}

export default enhance(Properties)
