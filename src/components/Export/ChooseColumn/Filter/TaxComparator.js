//@flow
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportTaxFiltersMutation from '../../exportTaxFiltersMutation'

const Container = styled.div`
  flex-basis: 150px;
  flex-shrink: 0;
  flex-grow: 1;
`
const StyledSelectField = styled(SelectField)`
  width: 100% !important;
`

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ taxname, pname, value, client }) => (
      event,
      index,
      comparator
    ) =>
      client.mutate({
        mutation: exportTaxFiltersMutation,
        variables: { taxname, pname, comparator: comparator || 'ILIKE', value },
      }),
  })
)

const Comparator = ({
  comparator,
  onChange,
}: {
  comparator: String,
  onChange: () => {},
}) => {
  return (
    <Container>
      <StyledSelectField
        floatingLabelFixed
        floatingLabelText="Vergleichs-Operator"
        value={comparator}
        onChange={onChange}
      >
        <MenuItem value="ILIKE" primaryText="enthalten" />
        <MenuItem
          value="LIKE"
          primaryText="enthalten (Grosschreibung berücksichtigt)"
        />
        <MenuItem value="=" primaryText="&#61; (genau gleich)" />
        <MenuItem value=">" primaryText="&#62;" />
        <MenuItem value=">=" primaryText="&#62;&#61;" />
        <MenuItem value="<" primaryText="&#60;" />
        <MenuItem value="<=" primaryText="&#60;&#61;" />
      </StyledSelectField>
    </Container>
  )
}

export default enhance(Comparator)
