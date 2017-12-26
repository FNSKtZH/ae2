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
import FlatButton from 'material-ui/FlatButton'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import booleanToJaNein from '../../modules/booleanToJaNein'
import exportXlsx from '../../modules/exportXlsx'
import exportCsv from '../../modules/exportCsv'
import pCOData from './pCOData'
import loginData from '../../modules/loginData'

const Container = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
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
const GridContainer = styled.div`
  height: 100%;
`
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 4px;
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

const enhance = compose(
  activeNodeArrayData,
  withState('sortField', 'setSortField', 'Objekt Name'),
  withState('sortDirection', 'setSortDirection', 'asc'),
  pCOData,
  loginData
)

const PCO = ({
  pCOData,
  loginData,
  dimensions,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
}: {
  pCOData: Object,
  loginData: Object,
  dimensions: Object,
  sortField: String,
  sortDirection: String,
  setSortField: () => void,
  setSortDirection: () => void,
}) => {
  const { loading } = pCOData
  if (loading) {
    return (
      <Container>
        <GridContainer>
          <TotalDiv>Lade Daten...</TotalDiv>
        </GridContainer>
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
  const loginName = get(loginData, 'login.username')
  const userIsWriter = !!loginName && writerNames.includes(loginName)
  console.log('PCO: userIsWriter:', userIsWriter)
  /**
   * TODO
   * if user is writer:
   * enable removing pco data
   * enable importing pco data if none exists
   */

  return (
    <Container>
      <GridContainer>
        <TotalDiv>{`${pCO.length} Datensätze, ${columns.length - 2} Feld${
          columns.length === 3 ? '' : 'er'
        }${pCO.length > 0 ? ':' : ''}`}</TotalDiv>
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
        <ButtonsContainer>
          {pCO.length > 0 && (
            <ExportButtons>
              <FlatButton
                label="xlsx exportieren"
                onClick={() =>
                  exportXlsx({
                    rows: pCO,
                    onSetMessage: console.log,
                    columns: keys,
                  })
                }
              />
              <FlatButton
                label="csv exportieren"
                onClick={() => exportCsv(pCO)}
              />
            </ExportButtons>
          )}
          {userIsWriter &&
            pCO.length > 0 && (
              <MutationButtons>
                <FlatButton
                  label="Daten löschen"
                  onClick={() => console.log('TODO')}
                />
              </MutationButtons>
            )}
          {userIsWriter &&
            pCO.length === 0 && (
              <MutationButtons>
                <FlatButton
                  label="Daten importieren"
                  onClick={() => console.log('TODO')}
                />
              </MutationButtons>
            )}
        </ButtonsContainer>
      </GridContainer>
    </Container>
  )
}

export default enhance(PCO)
