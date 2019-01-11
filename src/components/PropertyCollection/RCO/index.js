// @flow
import React, { useState, useCallback } from 'react'
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

import ImportRco from './Import'
import booleanToJaNein from '../../../modules/booleanToJaNein'
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import deleteRcoOfPcMutation from './deleteRcoOfPcMutation'
import treeDataQuery from '../../Tree/treeDataQuery'
import treeDataVariables from '../../Tree/treeDataVariables'

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
    activeNodeArray @client
    login @client {
      token
      username
    }
  }
`
const rcoQuery = gql`
  query rCOQuery($pCId: UUID!) {
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
            }
          }
        }
      }
      relationsByPropertyCollectionId {
        totalCount
        nodes {
          id
          objectId
          objectByObjectId {
            id
            name
          }
          objectIdRelation
          objectByObjectIdRelation {
            id
            name
          }
          relationType
          properties
        }
      }
    }
  }
`

const enhance = compose(withStyles(styles))

const RCO = ({
  dimensions,
  classes,
}: {
  dimensions: Object,
  classes: Object,
}) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, {
    suspend: false,
  })
  const activeNodeArray = get(storeData, 'activeNodeArray', [])
  const { refetch: treeDataRefetch } = useQuery(treeDataQuery, {
    suspend: false,
    variables: treeDataVariables({ activeNodeArray }),
  })
  const {
    data: rcoData,
    loading: rcoLoading,
    error: rcoError,
    refetch: rcoRefetch,
  } = useQuery(rcoQuery, {
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
  let rCO = []
  // collect all keys
  const allKeys = []
  const rCORaw = get(
    rcoData,
    'propertyCollectionById.relationsByPropertyCollectionId.nodes',
    [],
  ).map(p => omit(p, ['__typename']))
  rCORaw.forEach(p => {
    let nP = {}
    nP['Objekt ID'] = p.objectId
    nP['Objekt Name'] = get(p, 'objectByObjectId.name', null)
    nP['Beziehung ID'] = p.objectIdRelation
    nP['Beziehung Name'] = get(p, 'objectByObjectIdRelation.name', null)
    nP['Art der Beziehung'] = p.relationType
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
    rCO.push(nP)
  })
  rCO = orderBy(rCO, sortField, sortDirection)
  // collect all keys and sort property keys by name
  const keys = [
    'Objekt ID',
    'Objekt Name',
    'Beziehung ID',
    'Beziehung Name',
    'Art der Beziehung',
    ...union(allKeys).sort(),
  ]
  const columns = keys.map(k => ({
    key: k,
    name: k,
    resizable: true,
    sortable: true,
  }))
  const rCOWriters = get(
    rcoData,
    'propertyCollectionById.organizationByOrganizationId.organizationUsersByOrganizationId.nodes',
    [],
  ).filter(u => ['orgAdmin', 'orgCollectionWriter'].includes(u.role))
  const writerNames = union(rCOWriters.map(w => w.userByUserId.name))
  const username = get(storeData, 'login.username')
  const userIsWriter = !!username && writerNames.includes(username)
  const showImportRco = rCO.length === 0 && userIsWriter
  const pcId = get(
    storeData,
    'activeNodeArray[1]',
    '99999999-9999-9999-9999-999999999999',
  )

  const onGridSort = useCallback((column, direction) => {
    setSortField(column)
    setSortDirection(direction.toLowerCase())
  })
  const rowGetter = useCallback(i => rCO[i], [rCO])
  const onClickXlsx = useCallback(
    () =>
      exportXlsx({
        rows: rCO,
        onSetMessage: console.log,
      }),
    [rCO],
  )
  const onClickCsv = useCallback(() => exportCsv(rCO), [rCO])
  const onClickDelete = useCallback(
    async () => {
      await client.mutate({
        mutation: deleteRcoOfPcMutation,
        variables: { pcId },
      })
      rcoRefetch()
      treeDataRefetch()
    },
    [pcId],
  )

  if (rcoLoading) {
    return (
      <Container>
        <TotalDiv>Lade Daten...</TotalDiv>
      </Container>
    )
  }
  if (rcoError) {
    return <Container>{`Error fetching data: ${rcoError.message}`}</Container>
  }

  return (
    <Container>
      {!showImportRco && (
        <TotalDiv>{`${rCO.length.toLocaleString('de-CH')} Datensätze, ${(
          columns.length - 5
        ).toLocaleString('de-CH')} Feld${columns.length === 6 ? '' : 'er'}${
          rCO.length > 0 ? ':' : ''
        }`}</TotalDiv>
      )}
      {rCO.length > 0 && (
        <>
          <ReactDataGrid
            onGridSort={onGridSort}
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={rCO.length}
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
      {showImportRco && <ImportRco />}
    </Container>
  )
}

export default enhance(RCO)
