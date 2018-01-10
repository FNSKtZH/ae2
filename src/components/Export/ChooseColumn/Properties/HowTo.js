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

const HowToProperties = () => (
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
        <li>
          Nachfolgend sind alle Eigenschaften aufgelistet, die in den gewählten
          Taxonomien vorkommen
        </li>
        <li>Markieren Sie die Eigenschaften, die Sie exportieren möchten...</li>
        <li>...und fahren Sie danach mit "4. exportieren" weiter</li>
      </ul>
    </CardText>
  </Card>
)

export default HowToProperties
