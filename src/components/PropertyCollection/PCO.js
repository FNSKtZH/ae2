// @flow
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import forOwn from 'lodash/forOwn'
import union from 'lodash/union'
import orderBy from 'lodash/orderBy'
import ReactDataGrid from 'react-data-grid'
import Button from 'material-ui-next/Button'
import { withStyles } from 'material-ui-next/styles'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import booleanToJaNein from '../../modules/booleanToJaNein'
import exportXlsx from '../../modules/exportXlsx'
import exportCsv from '../../modules/exportCsv'
import pCOData from './pCOData'
import loginData from '../../modules/loginData'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .react-grid-Container {
    font-size: small;
  }
  .react-grid-Header {
  }
  .react-grid-HeaderRow {
    overflow: hidden;
  }
  .react-grid-HeaderCell:not(:first-child) {
    border-left: #c7c7c7 solid 1px !important;
  }
  .react-grid-HeaderCell__draggable {
    right: 16px !important;
  }
  .react-grid-Cell {
    border: #ddd solid 1px !important;
  }
`
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 8px;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const ExportButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const MutationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
`
const HowToImportContainer = styled.div`
  padding: 0 8px;
`
const EmSpan = styled.span`
  background-color: #8d8c8c40;
  padding: 1px 3px;
  border-radius: 4px;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const enhance = compose(
  activeNodeArrayData,
  withState('sortField', 'setSortField', 'Objekt Name'),
  withState('sortDirection', 'setSortDirection', 'asc'),
  pCOData,
  loginData,
  withStyles(styles)
)

const PCO = ({
  pCOData,
  loginData,
  dimensions,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  classes,
}: {
  pCOData: Object,
  loginData: Object,
  dimensions: Object,
  sortField: String,
  sortDirection: String,
  setSortField: () => void,
  setSortDirection: () => void,
  classes: Object,
}) => {
  const { loading } = pCOData
  if (loading) {
    return (
      <Container>
        <TotalDiv>Lade Daten...</TotalDiv>
      </Container>
    )
  }
  const height = isNaN(dimensions.height) ? 0 : dimensions.height
  const width = isNaN(dimensions.width) ? 0 : dimensions.width
  let pCO = []
  // collect all keys
  const allKeys = []
  const pCORaw = get(
    pCOData,
    'propertyCollectionById.propertyCollectionObjectsByPropertyCollectionId.nodes',
    []
  ).map(p => omit(p, ['__typename']))
  pCORaw.forEach(p => {
    let nP = {}
    nP['Objekt ID'] = p.objectId
    nP['Objekt Name'] = get(p, 'objectByObjectId.name', null)
    if (p.properties) {
      const props = JSON.parse(p.properties)
      forOwn(props, (value, key) => {
        if (typeof value === 'boolean') {
          nP[key] = booleanToJaNein(value)
        } else {
          nP[key] = value
        }
        // collect all keys
        allKeys.push(key)
      })
    }
    pCO.push(nP)
  })
  pCO = orderBy(pCO, sortField, sortDirection)
  // collect all keys and sort property keys by name
  const keys = ['Objekt ID', 'Objekt Name', ...union(allKeys).sort()]
  const columns = keys.map(k => ({
    key: k,
    name: k,
    resizable: true,
    sortable: true,
  }))
  const pCOWriters = get(
    pCOData,
    'propertyCollectionById.organizationByOrganizationId.organizationUsersByOrganizationId.nodes',
    []
  ).filter(u => ['orgAdmin', 'orgCollectionWriter'].includes(u.role))
  const writerNames = union(pCOWriters.map(w => w.userByUserId.name))
  const username = get(loginData, 'login.username')
  const userIsWriter = !!username && writerNames.includes(username)
  /**
   * TODO
   * if user is writer:
   * enable removing pco data
   * enable importing pco data if none exists
   */

  return (
    <Container>
      <TotalDiv>{`${pCO.length.toLocaleString('de-CH')} Datensätze, ${(
        columns.length - 2
      ).toLocaleString('de-CH')} Feld${columns.length === 3 ? '' : 'er'}${
        pCO.length > 0 ? ':' : ''
      }`}</TotalDiv>
      {pCO.length > 0 && (
        <ReactDataGrid
          onGridSort={(column, direction) => {
            setSortField(column)
            setSortDirection(direction.toLowerCase())
          }}
          columns={columns}
          rowGetter={i => pCO[i]}
          rowsCount={pCO.length}
          minHeight={height - 33 - 37}
          minWidth={width}
        />
      )}
      {pCO.length === 0 && (
        <HowToImportContainer>
          <h3>Anforderungen an zu importierende Eigenschaften</h3>
          <h4>Autorenrechte</h4>
          <ul>
            <li>
              Die Autoren müssen mit der Veröffentlichung einverstanden sein
            </li>
            <li>Dafür verantwortlich ist, wer Daten importiert</li>
          </ul>
          <h4>Tabelle</h4>
          <ul>
            <li>
              Tabelle im Format <EmSpan>.csv</EmSpan> oder{' '}
              <EmSpan>.xlsx</EmSpan>
            </li>
            <li>Die erste Zeile enthält Feld-Namen</li>
            <li>Jeder Wert hat einen Feld-Namen bzw. Spaltentitel</li>
            <li>Jede Zeile enthält Werte</li>
          </ul>
          <h4>Zuordnungs-Felder</h4>
          <ul>
            <li>
              Ein Feld namens <EmSpan>id</EmSpan> kann enthalten sein.<br />
              Wenn nicht, wird eine id erzeugt
            </li>
            <li>Die id muss eine gültige UUID sein</li>
            <li>
              Ein Feld namens <EmSpan>object_id</EmSpan> muss enthalten sein
            </li>
            <li>
              Die object_id muss die id eines Objekts aus arteigenschaften.ch
              sein
            </li>
          </ul>
          <p>Alle weiteren Felder sind Eigenschaften des Objekts.</p>
          <h4>Eigenschaften</h4>
          <ul>
            <li>Es muss mindestens eine Eigenschaft vorkommen</li>
            <li>
              Feld-Namen dürfen beinahe alles enthalten.<br />
              Ausser diese Zeichen:
              <ul>
                <li>"</li>
                <li>\</li>
              </ul>
            </li>
          </ul>
        </HowToImportContainer>
      )}
      <ButtonsContainer>
        {pCO.length > 0 && (
          <ExportButtons>
            <StyledButton
              onClick={() =>
                exportXlsx({
                  rows: pCO,
                  onSetMessage: console.log,
                  columns: keys,
                })
              }
              className={classes.button}
            >
              xlsx exportieren
            </StyledButton>
            <StyledButton
              onClick={() => exportCsv(pCO)}
              className={classes.button}
            >
              csv exportieren
            </StyledButton>
          </ExportButtons>
        )}
        {userIsWriter &&
          pCO.length > 0 && (
            <MutationButtons>
              <StyledButton
                onClick={() => console.log('TODO')}
                className={classes.button}
              >
                Daten löschen
              </StyledButton>
            </MutationButtons>
          )}
        {userIsWriter &&
          pCO.length === 0 && (
            <MutationButtons>
              <StyledButton
                onClick={() => console.log('TODO')}
                className={classes.button}
              >
                Daten importieren
              </StyledButton>
            </MutationButtons>
          )}
      </ButtonsContainer>
    </Container>
  )
}

export default enhance(PCO)
