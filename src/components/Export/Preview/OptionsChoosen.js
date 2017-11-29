// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import exportCategoriesGql from '../../../modules/exportCategoriesGql'
import exportPcoPropertiesGql from '../../../modules/exportPcoPropertiesGql'
import exportRcoPropertiesGql from '../../../modules/exportRcoPropertiesGql'
import exportTaxPropertiesGql from '../../../modules/exportTaxPropertiesGql'
import exportTaxFiltersGql from '../../../modules/exportTaxFiltersGql'
import exportPcoFiltersGql from '../../../modules/exportPcoFiltersGql'
import exportRcoFiltersGql from '../../../modules/exportRcoFiltersGql'

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = {}
const level1CardTextStyle = {
  padding: '0 16px !important',
  margin: '-10px 10px -5px 0',
}

const FilterValueSpan = styled.span`
  background-color: #dadada;
  padding: 1px 8px;
  margin-left: 5px;
  border-radius: 3px;
`

const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})
const exportTaxPropertiesData = graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})
const exportTaxFiltersData = graphql(exportTaxFiltersGql, {
  name: 'exportTaxFiltersData',
})
const exportPcoPropertiesData = graphql(exportPcoPropertiesGql, {
  name: 'exportPcoPropertiesData',
})
const exportPcoFiltersData = graphql(exportPcoFiltersGql, {
  name: 'exportPcoFiltersData',
})
const exportRcoPropertiesData = graphql(exportRcoPropertiesGql, {
  name: 'exportRcoPropertiesData',
})
const exportRcoFiltersData = graphql(exportRcoFiltersGql, {
  name: 'exportRcoFiltersData',
})

const enhance = compose(
  exportCategoriesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData
)

const OptionsChoosen = ({
  exportCategoriesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
}: {
  exportCategoriesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
}) => {
  const { exportCategories } = exportCategoriesData
  const { exportTaxProperties } = exportTaxPropertiesData
  const { exportTaxFilters } = exportTaxFiltersData
  const { exportPcoProperties } = exportPcoPropertiesData
  const { exportPcoFilters } = exportPcoFiltersData
  const { exportRcoProperties } = exportRcoPropertiesData
  const { exportRcoFilters } = exportRcoFiltersData
  return (
    <Card style={level1CardStyle} expanded={true}>
      <CardHeader
        title="Gewählte Optionen"
        actAsExpander={true}
        showExpandableButton={false}
        titleStyle={level1CardTitleStyle}
        style={level1CardHeaderStyle}
      />
      <CardText expandable={true} style={level1CardTextStyle}>
        <ul>
          <li>
            {`Gruppe${
              exportCategories.length > 1 ? 'n' : ''
            }: ${exportCategories.join(', ')}`}
          </li>
          <li>{`Die Felder der Taxonomien werden einzeln dargestellt`}</li>
          <li>Informationen von Synonymen werden berücksichtigt</li>
          <li>
            Filterkriterien in Eigenschaften- und Beziehungssammlungen filtern
            Arten bzw. Lebensräume
          </li>
          <li>Pro Beziehung eine Zeile</li>
          <li>
            {`Filter:${
              [...exportTaxFilters, ...exportPcoFilters, ...exportRcoFilters]
                .length === 0
                ? ' keine'
                : ''
            }`}
            <ul>
              {exportTaxFilters.map((p, i) => (
                <li key={i}>
                  {`${p.taxName}: ${p.pName} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>{p.value}</FilterValueSpan>
                </li>
              ))}
              {exportPcoFilters.map((p, i) => (
                <li key={i}>
                  {`${p.pCName}: ${p.pName} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>{p.value}</FilterValueSpan>
                </li>
              ))}
              {exportRcoFilters.map((p, i) => (
                <li key={i}>
                  {`${p.pCName}: ${p.pName} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>{p.value}</FilterValueSpan>
                </li>
              ))}
            </ul>
          </li>
          <li>
            Eigenschaften:
            <ul>
              {exportTaxProperties.map((p, i) => (
                <li key={i}>{`${p.taxName}: ${p.pName}`}</li>
              ))}
              {exportPcoProperties.map((p, i) => (
                <li key={i}>{`${p.pCName}: ${p.pName}`}</li>
              ))}
              {exportRcoProperties.map((p, i) => (
                <li key={i}>{`${p.pCName}: ${p.pName}`}</li>
              ))}
            </ul>
          </li>
        </ul>
      </CardText>
    </Card>
  )
}

export default enhance(OptionsChoosen)
