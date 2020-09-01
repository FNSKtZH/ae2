import React, { useState, useCallback, useContext, useMemo } from 'react'
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
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import ImportRco from './Import'
import booleanToJaNein from '../../../modules/booleanToJaNein'
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import deleteRcoOfPcMutation from './deleteRcoOfPcMutation'
import treeDataQuery from '../../Tree/treeDataQuery'
import treeDataVariables from '../../Tree/treeDataVariables'
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
    margin: theme.spacing(1),
  },
})

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

const enhance = compose(
  withStyles(styles),
  observer,
)

const RCO = ({ dimensions, classes }) => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const { login } = mobxStore
  const activeNodeArray = mobxStore.activeNodeArray.toJS()
  const pCId =
    activeNodeArray.length > 0
      ? activeNodeArray[1]
      : '99999999-9999-9999-9999-999999999999'
  const { refetch: treeDataRefetch } = useQuery(treeDataQuery, {
    variables: treeDataVariables({ activeNodeArray }),
  })
  const {
    data: rcoData,
    loading: rcoLoading,
    error: rcoError,
    refetch: rcoRefetch,
  } = useQuery(rcoQuery, {
    variables: {
      pCId,
    },
  })

  const [sortField, setSortField] = useState('Objekt Name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [importing, setImport] = useState(false)

  const height = isNaN(dimensions.height) ? 0 : dimensions.height
  const width = isNaN(dimensions.width) ? 0 : dimensions.width

  const [rCO, allKeys, rCORaw] = useMemo(()=>{
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
    return [rCO, allKeys, rCORaw]
  }, [rcoData, sortDirection, sortField])
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
  const { username } = login
  const userIsWriter = !!username && writerNames.includes(username)
  const showImportRco = (rCO.length === 0 && userIsWriter) || importing

  const onGridSort = useCallback((column, direction) => {
    setSortField(column)
    setSortDirection(direction.toLowerCase())
  }, [])
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
  const onClickDelete = useCallback(async () => {
    await client.mutate({
      mutation: deleteRcoOfPcMutation,
      variables: { pcId: pCId },
    })
    rcoRefetch()
    treeDataRefetch()
  }, [client, pCId, rcoRefetch, treeDataRefetch])
  const onClickImport = useCallback(() => {
    setImport(true)
  }, [])

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
      {!importing && rCO.length > 0 && (
        <>
          <ReactDataGrid
            onGridSort={onGridSort}
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={rCO.length}
            minHeight={height - 26 - 54}
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
                  onClick={onClickImport}
                  className={classes.button}
                >
                  importieren
                </StyledButton>
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
      {showImportRco && <ImportRco setImport={setImport} pCO={rCORaw} />}
    </Container>
  )
}

export default enhance(RCO)
