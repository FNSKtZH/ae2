import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const StyledCardContent = styled(CardContent)`
  padding: 0 16px 0 0 !important;
  margin: -10px 0 0 0;
  li {
    margin-top: 8px;
  }
`

const Tipps = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <StyledCard>
      <StyledCardActions disableSpacing onClick={() => setExpanded(!expanded)}>
        <CardActionTitle>Tipps und Tricks</CardActionTitle>
        <CardActionIconButton
          data-expanded={expanded}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <Icon>
            <ExpandMoreIcon />
          </Icon>
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
              {`Sie können Vergleichsoperatoren verwenden.`}
              <br />
              {`Das Feld, um sie zu wählen erscheint, nachdem ein Filter-Wert erfasst wurde.`}
            </li>
            <li>
              {`Es kommt nicht auf Gross-/Kleinschreibung an.`}
              <br />
              {`Beispiel: Schreiben Sie "eisvogel", wird auch "Eisvogel" gefunden.`}
              <br />
              {`Sie möchten nach Gross-/Kleinschreibung unterscheiden? Dann wählen Sie den Vergleichsoperator "=".`}
            </li>
            <li>
              {`Sie können nach einem Teil des Feldinhalts filtern.`}
              <br />
              {`Beispiel: Schreiben Sie "Vogel", wird auch "Eisvogel" gefunden.`}
              <br />
              {`Sie möchten nach dem ganzen Feldinhalt filtern? Dann wählen Sie den Vergleichsoperator "=".`}
            </li>
            <li>
              {`Wenn Sie Filter-Werte eingeben, erscheint eine Liste der diese Zeichen enthaltenden Werte dieses Feldes.`}
              <br />
              {`Sie können die ungefilterte Liste aller enthaltenen Werte öffnen, indem Sie einen Leerschlag tippen.`}
            </li>
          </ul>
        </StyledCardContent>
      </Collapse>
    </StyledCard>
  )
}

export default Tipps
