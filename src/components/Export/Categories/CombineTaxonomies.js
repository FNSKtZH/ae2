// @flow
import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import exportCombineTaxonomiesMutation from '../../../modules/exportCombineTaxonomiesMutation'
import exportCombineTaxonomiesGql from '../../../modules/exportCombineTaxonomiesGql'

const exportCombineTaxonomiesData = graphql(exportCombineTaxonomiesGql, {
  name: 'exportCombineTaxonomiesData',
})

const enhance = compose(
  withApollo,
  exportCombineTaxonomiesData,
  withHandlers({
    onCheckCombineTaxonomies: props => (event, isChecked) =>
      props.client.mutate({
        mutation: exportCombineTaxonomiesMutation,
        variables: { value: isChecked },
      }),
  })
)

const cardStyle = { margin: '10px 0' }
const cardTitleStyle = { fontWeight: 'bold' }
const cardHeaderStyle = {}
const cardTextStyle = {
  paddingTop: 0,
  paddingBottom: 10,
  paddingLeft: 16,
  margin: '-10px 0 -5px 0',
}

const CombineTaxonomies = ({
  data,
  exportCombineTaxonomiesData,
  onCheckCombineTaxonomies,
}: {
  data: Object,
  exportCombineTaxonomiesData: Object,
  onCheckCombineTaxonomies: () => void,
}) => {
  const exportCombineTaxonomies =
    exportCombineTaxonomiesData.exportCombineTaxonomies
  return (
    <Card style={cardStyle}>
      <CardHeader
        title="Felder der gewählten Taxonomien zusammenfassen?"
        actAsExpander={true}
        showExpandableButton={true}
        titleStyle={cardTitleStyle}
        style={cardHeaderStyle}
      />
      <CardText expandable={true} style={cardTextStyle}>
        <ul>
          <li>
            Wählen Sie diese Option, werden die Taxonomien der gewählten Gruppen
            unter dem Titel "Taxonomie(n)" zusammegefasst...<br />
            ...und darunter alle in diesen Taxonomien vorkommenden Felder
            aufgelistet
          </li>
          <li>
            Dabei werden die Daten gleich lautender Felder ins selbe Feld
            geschrieben ("zusammegefasst"), und zwar:
            <ul>
              <li>schon beim filtern und Eigenschaften wählen</li>
              <li>...und natürlich beim exportieren</li>
            </ul>
          </li>
          <li>
            Nicht beeinflusst werden Felder aus Eigenschaften- oder
            Beziehungssammlungen
          </li>
        </ul>
        <p>
          <strong>Was nützt das?</strong> Sie können zum Beispiel:
        </p>
        <ul>
          <li>
            Lebensräume im Feld "Taxonomie" nach "Delarze" filtern um alle
            Taxonomien von Delarze gleichzeitig zu exportieren
          </li>
          <li>
            Arten aus Flora und Fauna gleichzeitig exportieren und dabei den
            vollständigen Artnamen ins selbe Feld ("Artname vollständig")
            schreiben
          </li>
        </ul>
        <Checkbox
          label="Felder der gewählten Taxonomien zusammenfassen"
          checked={exportCombineTaxonomies}
          onCheck={onCheckCombineTaxonomies}
        />
      </CardText>
    </Card>
  )
}

export default enhance(CombineTaxonomies)
