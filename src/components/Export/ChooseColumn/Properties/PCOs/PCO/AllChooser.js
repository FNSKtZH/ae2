//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import addExportPcoPropertyMutation from '../../../../addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../../removeExportPcoPropertyMutation'

const Container = styled.div`
  margin-bottom: 16px;
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const storeQuery = gql`
  query exportPcoPropertiesQuery {
    exportPcoProperties @client {
      pcname
      pname
    }
  }
`

const AllPcoChooser = ({ properties }: { properties: Array<Object> }) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { pcname, pname },
        })
      })
    },
    [properties],
  )

  const exportPcoProperties = storeData.exportPcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportPcoProperties.filter(
        x =>
          x.pcname === p.propertyCollectionName && x.pname === p.propertyName,
      ).length > 0,
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label="alle"
      />
    </Container>
  )
}

export default AllPcoChooser
