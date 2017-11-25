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

const HowToFilter = () => (
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
          Gruppen vorkommen
        </li>
        <li>
          Erfassen Sie in den Eigenschaften Ihrer Wahl die gewünschten
          Filter-Kriterien...
        </li>
        <li>
          ...und wählen Sie danach unter "3. Eigenschaften wählen", welche
          Eigenschaften exportiert werden sollen
        </li>
      </ul>
    </CardText>
  </Card>
)

export default HowToFilter
