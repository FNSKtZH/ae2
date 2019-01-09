//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import addExportTaxPropertyMutation from '../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../removeExportTaxPropertyMutation'

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
  query storeQuery {
    exportTaxProperties @client {
      taxname
      pname
    }
  }
`

const AllTaxChooser = ({ properties }: { properties: Array<Object> }) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, {
    suspend: false,
  })

  const exportTaxProperties = storeData.exportTaxProperties || []
  const checkedArray = properties.map(
    p =>
      exportTaxProperties.filter(
        x => x.taxname === p.taxname && x.pname === p.propertyName,
      ).length > 0,
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      properties.forEach(p => {
        const taxname = p.taxonomyName
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { taxname, pname },
        })
      })
    },
    [properties],
  )

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

export default AllTaxChooser
