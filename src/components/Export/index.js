// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
//import get from 'lodash/get'

import Categories from './Categories'
import Properties from './Properties'

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = { backgroundColor: '#FFCC80' }
const level1CardTextStyle = { padding: 0 }

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledH3 = styled.h3`
  margin: 5px 0;
`

const Export = ({ data }: { data: Object }) => {
  //console.log('Export: data:', data)
  //const pcoProperties = get(data, 'pcoPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: pcoProperties:', pcoProperties)
  //const rcoProperties = get(data, 'rcoPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: rcoProperties:', rcoProperties)
  //const taxProperties = get(data, 'taxPropertiesByCategoriesFunction.nodes', [])
  //console.log('Export: taxProperties:', taxProperties)

  return (
    <Container>
      <StyledH3>Export</StyledH3>
      <Card style={level1CardStyle}>
        <CardHeader
          title="1. Gruppe(n) wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          <Categories data={data} />
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title="2. filtern"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          card text filtern
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title="3. Eigenschaften wählen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          <Properties data={data} />
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title="4. exportieren"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          card text exportieren
        </CardText>
      </Card>
    </Container>
  )
}

export default Export
