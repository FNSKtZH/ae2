//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import addExportTaxPropertyMutation from '../../../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../../../removeExportTaxPropertyMutation'

const Container = styled.div``
const Count = styled.span`
  font-size: xx-small;
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

const TaxChooser = ({
  taxname,
  pname,
  jsontype,
  count,
}: {
  taxname: string,
  pname: string,
  jsontype: string,
  count: number,
}) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      client.mutate({
        mutation,
        variables: { taxname, pname },
      })
    },
    [taxname, pname],
  )

  const exportTaxProperties = storeData.exportTaxProperties || []
  const checked =
    exportTaxProperties.filter(
      x => /*x.taxname === taxname && */ x.pname === pname,
    ).length > 0

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label={
          <div>
            {pname} <Count title="Anzahl Objekte">{`(${count} Objekte)`}</Count>
          </div>
        }
      />
    </Container>
  )
}

export default TaxChooser
