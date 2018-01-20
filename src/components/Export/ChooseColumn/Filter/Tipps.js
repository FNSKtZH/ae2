// @flow
import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui-next/Card'
import Collapse from 'material-ui-next/transitions/Collapse'
import IconButton from 'material-ui-next/IconButton'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 0 !important;
  margin: -10px 0 0 0;
`

const enhance = compose(withState('expanded', 'setExpanded', false))

const Tipps = ({
  expanded,
  setExpanded,
}: {
  expanded: Boolean,
  setExpanded: () => void,
}) => (
  <StyledCard>
    <StyledCardActions
      disableActionSpacing
      onClick={() => setExpanded(!expanded)}
    >
      <CardActionTitle>Tipps und Tricks</CardActionTitle>
      <CardActionIconButton
        data-expanded={expanded}
        aria-expanded={expanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </CardActionIconButton>
    </StyledCardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <StyledCardContent>
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
      </StyledCardContent>
    </Collapse>
  </StyledCard>
)

export default enhance(Tipps)
