// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import exportTaxonomiesData from '../../../modules/exportTaxonomiesData'
import exportPcoPropertiesData from '../../../modules/exportPcoPropertiesData'
import exportRcoPropertiesData from '../../../modules/exportRcoPropertiesData'
import exportTaxPropertiesData from '../../../modules/exportTaxPropertiesData'
import exportTaxFiltersData from '../../../modules/exportTaxFiltersData'
import exportPcoFiltersData from '../../../modules/exportPcoFiltersData'
import exportRcoFiltersData from '../../../modules/exportRcoFiltersData'

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

const enhance = compose(
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData
)

const OptionsChoosen = ({
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
}: {
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
}) => {
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    []
  )
  const exportTaxFilters = get(exportTaxFiltersData, 'exportTaxFilters', [])
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportPcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', [])
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const exportRcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', [])
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
              exportTaxonomies.length > 1 ? 'n' : ''
            }: ${exportTaxonomies.join(', ')}`}
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
                  {`${p.taxname}: ${p.pname} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>{p.value}</FilterValueSpan>
                </li>
              ))}
              {exportPcoFilters.map((p, i) => (
                <li key={i}>
                  {`${p.pcname}: ${p.pname} ${
                    p.comparator ? `${p.comparator}` : ''
                  }`}
                  <FilterValueSpan>{p.value}</FilterValueSpan>
                </li>
              ))}
              {exportRcoFilters.map((p, i) => (
                <li key={i}>
                  {`${p.pcname}: ${p.pname} ${
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
                <li key={i}>{`${p.taxname}: ${p.pname}`}</li>
              ))}
              {exportPcoProperties.map((p, i) => (
                <li key={i}>{`${p.pcname}: ${p.pname}`}</li>
              ))}
              {exportRcoProperties.map((p, i) => (
                <li key={i}>{`${p.pcname}: ${p.pname}`}</li>
              ))}
            </ul>
          </li>
        </ul>
      </CardText>
    </Card>
  )
}

export default enhance(OptionsChoosen)
