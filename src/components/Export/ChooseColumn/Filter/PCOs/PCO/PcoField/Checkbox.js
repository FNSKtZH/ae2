//@flow
import React, { useCallback } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import exportPcoFiltersMutation from '../../../../../exportPcoFiltersMutation'
import addExportPcoPropertyMutation from '../../../../../addExportPcoPropertyMutation'

const Container = styled.div`
  width: 100%;
  padding: 8px 16px;
`
const StyledFormLabel = styled(FormLabel)`
  margin-top: 10px;
  padding-bottom: 8px !important;
  cursor: text;
  font-size: 12px !important;
  pointer-events: none;
  user-select: none;
`
/**
 * material-ui sets -14px
 * which leads to NOTHING SHOWING!!!???
 */
const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: -2px !important;
`
const StyledRadio = styled(Radio)`
  height: 26px !important;
`

const storeQuery = gql`
  query exportAddFilterFieldsQuery {
    exportAddFilterFields @client
  }
`

const PcoCheckbox = ({
  pname,
  pcname,
  value,
}: {
  pname: string,
  pcname: string,
  value: string,
}) => {
  const client = useApolloClient()
  const { data } = useQuery(storeQuery, {
    suspend: false,
  })
  const onChange = useCallback(
    (e, val) => {
      let comparator = '='
      let value = val
      if (value === 'null') {
        comparator = null
        value = null
      }
      client.mutate({
        mutation: exportPcoFiltersMutation,
        variables: { pcname, pname, comparator, value },
      })
      // if value and not choosen, choose
      const exportAddFilterFields = get(data, 'exportAddFilterFields', true)
      if (exportAddFilterFields) {
        client.mutate({
          mutation: addExportPcoPropertyMutation,
          variables: { pcname, pname },
        })
      }
    },
    [pcname, pname, data],
  )

  return (
    <Container>
      <FormControl component="fieldset">
        <StyledFormLabel component="legend">{pname}</StyledFormLabel>
        <RadioGroup
          aria-label={pname}
          name={pname}
          value={value}
          onChange={onChange}
        >
          <StyledFormControlLabel
            value="true"
            control={<StyledRadio color="primary" />}
            label="Ja"
          />
          <StyledFormControlLabel
            value="false"
            control={<StyledRadio color="primary" />}
            label="Nein"
          />
          <StyledFormControlLabel
            value="null"
            control={<StyledRadio color="primary" />}
            label="nicht filtern"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  )
}

export default PcoCheckbox
