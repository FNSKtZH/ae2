// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = {}
const level1CardTextStyle = {
  padding: '0 16px !important',
  margin: '-10px 0 -5px 0',
}

const Categories = () =>
  <Card style={level1CardStyle}>
    <CardHeader
      title="So geht's"
      actAsExpander={true}
      showExpandableButton={true}
      titleStyle={level1CardTitleStyle}
      style={level1CardHeaderStyle}
    />
    <CardText expandable={true} style={level1CardTextStyle}>
      <ul>
        <li>Wählen Sie eine oder mehrere Gruppen...</li>
        <li>...dann werden ihre Eigenschaften aufgebaut...</li>
        <li>...und Sie können filtern und Eigenschaften wählen</li>
      </ul>
    </CardText>
  </Card>

export default Categories
