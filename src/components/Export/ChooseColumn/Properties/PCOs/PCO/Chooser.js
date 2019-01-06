//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import addExportPcoPropertyMutation from '../../../../addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../../removeExportPcoPropertyMutation'

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
  query exportPcoPropertiesQuery {
    exportPcoProperties @client {
      pcname
      pname
    }
  }
`

const PcoChooser = ({
  pcname,
  pname,
  jsontype,
  count,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
}) => {
  const client = useApolloClient()
  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pcname, pname },
      })
    },
    [pcname, pname],
  )

  const exportPcoProperties = get(storeData, 'exportPcoProperties', [])
  const checked =
    exportPcoProperties.filter(x => x.pcname === pcname && x.pname === pname)
      .length > 0

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

export default PcoChooser
