// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import compose from 'recompose/compose'
import get from 'lodash/get'

import exportPcoPropertiesData from '../exportPcoPropertiesData'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import exportTaxPropertiesData from '../../../modules/exportTaxPropertiesData'

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = {}
const level1CardTextStyle = {
  padding: '0 16px !important',
  margin: '0 16px 10px 16px',
}

const enhance = compose(
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData
)

const HowToPreview = ({
  exportTaxPropertiesData,
  exportPcoPropertiesData,
  exportRcoPropertiesData,
}: {
  exportTaxPropertiesData: Object,
  exportPcoPropertiesData: Object,
  exportRcoPropertiesData: Object,
}) => {
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    []
  )
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const dataChoosen =
    [...exportTaxProperties, ...exportPcoProperties, ...exportRcoProperties]
      .length > 0

  if (dataChoosen) return null
  return (
    <Card style={level1CardStyle} expanded={true}>
      <CardHeader
        title="So geht's"
        actAsExpander={true}
        showExpandableButton={false}
        titleStyle={level1CardTitleStyle}
        style={level1CardHeaderStyle}
      />
      <CardText expandable={true} style={level1CardTextStyle}>
        Sobald Sie Taxonomien und Eigenschaften gewählt haben, werden die Daten
        hier angezeigt.
      </CardText>
    </Card>
  )
}

export default enhance(HowToPreview)
