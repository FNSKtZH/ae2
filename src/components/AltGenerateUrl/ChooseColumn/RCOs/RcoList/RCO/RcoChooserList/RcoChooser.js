//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import addExportRcoPropertyMutation from '../../../../../addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../../../removeExportRcoPropertyMutation'

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
  query exportRcoPropertiesQuery {
    exportRcoProperties @client {
      pcname
      relationtype
      pname
    }
  }
`

const RcoChooser = ({
  pcname,
  relationtype,
  pname,
  jsontype,
  count,
}: {
  pcname: String,
  relationtype: String,
  pname: String,
  jsontype: String,
  count: Number,
}) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, {
    suspend: false,
  })

  const exportRcoProperties = storeData.exportRcoProperties || []
  const checked =
    exportRcoProperties.filter(
      x =>
        x.pcname === pcname &&
        x.relationtype === relationtype &&
        x.pname === pname,
    ).length > 0

  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pcname, relationtype, pname },
      })
    },
    [pcname, relationtype, pname],
  )

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

export default RcoChooser
