//@flow
import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'

import exportPcoFiltersMutation from '../../exportPcoFiltersMutation'
import exportAddFilterFieldsData from '../../exportAddFilterFieldsData'
import addExportPcoPropertyMutation from '../../addExportPcoPropertyMutation'

const Container = styled.div`
  width: 100%;
  padding: 0 16px 16px 16px;
`
const StyledFormLabel = styled(FormLabel)`
  margin-top: 10px;
  cursor: text;
  font-size: 12px !important;
  pointer-events: none;
  user-select: none;
  padding-bottom: 8px !important;
`
const StyledFormControlLabel = styled(FormControlLabel)`
  height: 26px !important;
`

const enhance = compose(
  withApollo,
  exportAddFilterFieldsData,
  withHandlers({
    onChange: ({ pcname, pname, client, exportAddFilterFieldsData }) => (
      e,
      val
    ) => {
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
      const exportAddFilterFields = get(
        exportAddFilterFieldsData,
        'exportAddFilterFields',
        true
      )
      if (exportAddFilterFields) {
        client.mutate({
          mutation: addExportPcoPropertyMutation,
          variables: { pcname, pname },
        })
      }
    },
  })
)

const PcoCheckbox = ({
  pname,
  value,
  onChange,
}: {
  pname: string,
  value: string,
  onChange: () => {},
}) => (
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
          control={<Radio color="primary" />}
          label="Ja"
        />
        <StyledFormControlLabel
          value="false"
          control={<Radio color="primary" />}
          label="Nein"
        />
        <StyledFormControlLabel
          value="null"
          control={<Radio color="primary" />}
          label="nicht filtern"
        />
      </RadioGroup>
    </FormControl>
  </Container>
)

export default enhance(PcoCheckbox)
