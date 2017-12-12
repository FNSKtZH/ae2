//@flow
import React from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportPcoFiltersMutation from '../../../../modules/exportPcoFiltersMutation'

const Container = styled.div`
  width: 100%;
  padding: 0 16px;
`
const StyledLabel = styled.div`
  margin-top: 10px;
  cursor: text;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  user-select: none;
  padding-bottom: 8px;
`

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ pcname, pname, client }) => (e, val) => {
      let comparator = '='
      let value = val
      if (value === 'nope') {
        comparator = null
        value = null
      }
      client.mutate({
        mutation: exportPcoFiltersMutation,
        variables: { pcname, pname, comparator, value },
      })
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
    <StyledLabel>{pname}</StyledLabel>
    <RadioButtonGroup
      name="shipSpeed"
      defaultSelected="nope"
      onChange={onChange}
    >
      <RadioButton value={true} label="Ja" />
      <RadioButton value={false} label="Nein" />
      <RadioButton value="nope" label="nicht filtern" />
    </RadioButtonGroup>
  </Container>
)

export default enhance(PcoCheckbox)
