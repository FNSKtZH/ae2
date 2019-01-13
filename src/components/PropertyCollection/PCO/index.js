// @flow
import React, { useState, useCallback, useContext } from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import forOwn from 'lodash/forOwn'
import union from 'lodash/union'
import orderBy from 'lodash/orderBy'
import ReactDataGrid from 'react-data-grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import ImportPco from './Import'
import booleanToJaNein from '../../../modules/booleanToJaNein'
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import treeDataQuery from '../../Tree/treeDataQuery'
import treeDataVariables from '../../Tree/treeDataVariables'
import deletePcoOfPcMutation from './deletePcoOfPcMutation'
import mobxStoreContext from '../../../mobxStoreContext'

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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const storeQuery = gql`
  query activeNodeArrayQuery {
    login @client {
      token
      username
    }
  }
`
const pcoQuery = gql`
  query pCOQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      organizationByOrganizationId {
        id
        name
        organizationUsersByOrganizationId {
          nodes {
            id
            userId
            role
            userByUserId {
              id
              name
              email
            }
          }
        }
      }
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
        nodes {
          id
          objectId
          objectByObjectId {
            id
            name
          }
          properties
        }
      }
    }
  }
`

const enhance = compose(
  withStyles(styles),
  observer,
)

const PCO = ({
  dimensions,
  classes,
}: {
  dimensions: Object,
  classes: Object,
}) => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const { activeNodeArray } = mobxStore
  const { data: storeData } = useQuery(storeQuery, {
    suspend: false,
  })
  const { refetch: treeDataRefetch } = useQuery(treeDataQuery, {
    suspend: false,
    variables: treeDataVariables({ activeNodeArray }),
  })
  const {
    data: pcoData,
    loading: pcoLoading,
    error: pcoError,
    refetch: pcoRefetch,
  } = useQuery(pcoQuery, {
    suspend: false,
    variables: {
      pCId: get(
        storeData,
        'activeNodeArray[1]',
        '99999999-9999-9999-9999-999999999999',
      ),
    },
  })

  const [sortField, setSortField] = useState('Objekt Name')
  const [sortDirection, setSortDirection] = useState('asc')

  const height = isNaN(dimensions.height) ? 0 : dimensions.height
  const width = isNaN(dimensions.width) ? 0 : dimensions.width
  let pCO = []
  // collect all keys
  const allKeys = []
  const pCORaw = get(
    pcoData,
    'propertyCollectionById.propertyCollectionObjectsByPropertyCollectionId.nodes',
    [],
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
    pcoData,
    'propertyCollectionById.organizationByOrganizationId.organizationUsersByOrganizationId.nodes',
    [],
  ).filter(u => ['orgAdmin', 'orgCollectionWriter'].includes(u.role))
  const writerNames = union(pCOWriters.map(w => w.userByUserId.name))
  const username = get(storeData, 'login.username')
  const userIsWriter = !!username && writerNames.includes(username)
  const showImportPco = pCO.length === 0 && userIsWriter
  const pcId = get(
    storeData,
    'activeNodeArray[1]',
    '99999999-9999-9999-9999-999999999999',
  )

  const onGridSort = useCallback((column, direction) => {
    setSortField(column)
    setSortDirection(direction.toLowerCase())
  })
  const rowGetter = useCallback(i => pCO[i], [pCO])
  const onClickXlsx = useCallback(
    () =>
      exportXlsx({
        rows: pCO,
        onSetMessage: console.log,
      }),
    [pCO],
  )
  const onClickCsv = useCallback(() => exportCsv(pCO), [pCO])
  const onClickDelete = useCallback(
    async () => {
      await client.mutate({
        mutation: deletePcoOfPcMutation,
        variables: { pcId },
      })
      pcoRefetch()
      treeDataRefetch()
    },
    [pcId],
  )

  if (pcoLoading) {
    return (
      <Container>
        <TotalDiv>Lade Daten...</TotalDiv>
      </Container>
    )
  }
  if (pcoError) {
    return <Container>{`Error fetching data: ${pcoError.message}`}</Container>
  }

  return (
    <Container>
      {!showImportPco && (
        <TotalDiv>{`${pCO.length.toLocaleString('de-CH')} Datensätze, ${(
          columns.length - 2
        ).toLocaleString('de-CH')} Feld${columns.length === 3 ? '' : 'er'}${
          pCO.length > 0 ? ':' : ''
        }`}</TotalDiv>
      )}
      {pCO.length > 0 && (
        <>
          <ReactDataGrid
            onGridSort={onGridSort}
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={pCO.length}
            minHeight={height - 33 - 37}
            minWidth={width}
          />
          <ButtonsContainer>
            <ExportButtons>
              <StyledButton onClick={onClickXlsx} className={classes.button}>
                xlsx exportieren
              </StyledButton>
              <StyledButton onClick={onClickCsv} className={classes.button}>
                csv exportieren
              </StyledButton>
            </ExportButtons>
            {userIsWriter && (
              <MutationButtons>
                <StyledButton
                  onClick={onClickDelete}
                  className={classes.button}
                >
                  Daten löschen
                </StyledButton>
              </MutationButtons>
            )}
          </ButtonsContainer>
        </>
      )}
      {showImportPco && <ImportPco />}
    </Container>
  )
}

export default enhance(PCO)
