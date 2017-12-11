// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = {}
const level1CardTextStyle = {
  padding: '0 16px !important',
  margin: '-10px 10px -5px 0',
}

const HowToPreview = () => (
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
        <li>Aus den Rohdaten werden die Exportdaten extrahiert...</li>
        <li>...das dauert eine ganze Weile. Geduld bringt Daten!</li>
        <li>Danach wird eine Vorschau der ersten 10 Datensätze angezeigt...</li>
        <li>...und es erscheinen Schaltflächen für den Download</li>
      </ul>
    </CardText>
  </Card>
)

export default HowToPreview
