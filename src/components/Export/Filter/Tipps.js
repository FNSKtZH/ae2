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

const Tipps = () => (
  <Card style={level1CardStyle}>
    <CardHeader
      title="Tipps und Tricks"
      actAsExpander={true}
      showExpandableButton={true}
      titleStyle={level1CardTitleStyle}
      style={level1CardHeaderStyle}
    />
    <CardText expandable={true} style={level1CardTextStyle}>
      <ul>
        <li>
          {`Sie können nach beliebig vielen Eigenschaften filtern. Jedes Kriterium reduziert die Anzahl "Treffer".`}
          <br />
          {`Beispiel: Filtern Sie im Namen nach "Eisvogel" und in der Ordnung nach "Lepidoptera", erhalten Sie drei Schmetterlinge aber nicht den entsprechenden Vogel.`}
        </li>
        <li>
          {`Sie möchten nach "Schmetterlinge" oder "Vögel" suchen? Exportieren Sie zuerst "Schmetterlinge", danach die "Vögel" und setzen die zwei Exporte zusammen.`}
        </li>
        <li>
          {`Es kommt nicht auf Gross-/Kleinschreibung an.`}
          <br />
          {`Beispiel: Schreiben Sie "eisvogel", wird auch "Eisvogel" gefunden.`}
        </li>
        <li>
          {`Sie können nach einem Teil des Feldinhalts filtern (wenn Sie keine Vergleichsoperatoren verwenden).`}
          <br />
          {`Beispiel: Schreiben Sie "Vogel", wird auch "Eisvogel" gefunden.`}
        </li>
        <li>
          {`Sie können die folgenden Vergleichsoperatoren im jeweils linken Feld verwenden:`}
          <br />
          {`Beispiel 1: Schreiben Sie im Feld "Artwert" ">5", werden Arten mit Artwert ab 6 gefunden.`}
          <br />
          {`Beispiel 2: Schreiben Sie "=Vogel", wird "Vogel" gefunden, nicht aber "Eisvogel".`}
        </li>
        <li>
          {`Klicken Sie auf unterstrichene Namen um zu sehen, in welchen Gruppen und in wievielen Objekten die Eigenschaft vorkommt.`}
        </li>
        <li>
          {`Was (noch) NICHT funktioniert: Wenn Sie nach zwei oder mehr Eigenschaften derselben                 Beziehungssammlung filtern und eines davon ist "Beziehungspartner", erhalten Sie zuviele Resultate.`}
          <br />
          {`Filtern Sie hier also bloss nach einer Eigenschaft und im exportierten Resultat nach der zweiten.`}
        </li>
      </ul>
    </CardText>
  </Card>
)

export default Tipps
