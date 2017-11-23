// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import HowTo from './HowTo'

const enhance = compose(
  withApollo,
  withHandlers({
    onCheck: () => (event, isChecked) => {},
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`

const level1CardStyle = { margin: '10px 0' }
const level1CardTitleStyle = { fontWeight: 'bold' }
const level1CardHeaderStyle = { backgroundColor: '#FFCC80' }
const level1CardTextStyle = { padding: '5px 16px' }

const Properties = ({
  data,
  exportCategoriesData,
  exportCombineTaxonomiesData,
  onCheck,
}: {
  data: Object,
  exportCategoriesData: Object,
  exportCombineTaxonomiesData: Object,
  onCheck: () => void,
}) => {
  return (
    <Container>
      <HowTo />
      <Card style={level1CardStyle}>
        <CardHeader
          title="Taxonomie"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          need something here
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title="Eigenschaftensammlungen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          need something here
        </CardText>
      </Card>
      <Card style={level1CardStyle}>
        <CardHeader
          title="Beziehungssammlungen"
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={level1CardTitleStyle}
          style={level1CardHeaderStyle}
        />
        <CardText expandable={true} style={level1CardTextStyle}>
          need something here
        </CardText>
      </Card>
    </Container>
  )
}

export default enhance(Properties)
