//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import addExportTaxPropertyMutation from '../../../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../../../removeExportTaxPropertyMutation'

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
  query exportTaxPropertiesQuery {
    exportTaxProperties @client {
      taxname
      pname
    }
  }
`

const AllTaxChooser = ({ properties }: { properties: Array<Object> }) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const onCheck = useCallback(
    async (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      for (let p of properties) {
        client.mutate({
          mutation,
          variables: {
            taxname: p.taxname ? p.taxname : p.taxonomyName,
            pname: p.propertyName,
          },
        })
      }
    },
    [properties],
  )

  const exportTaxProperties = storeData.exportTaxProperties || []
  const checkedArray = properties.map(p => {
    const taxname = p.taxname ? p.taxname : p.taxonomyName
    return (
      exportTaxProperties.filter(
        x => x.taxname === taxname && x.pname === p.propertyName,
      ).length > 0
    )
  })
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

export default AllTaxChooser
