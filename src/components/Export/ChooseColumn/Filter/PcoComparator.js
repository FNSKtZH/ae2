//@flow
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportPcoFiltersMutation from '../../../../modules/exportPcoFiltersMutation'

const Container = styled.div``
const StyledSelectField = styled(SelectField)`
  width: 150px !important;
`

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ pcname, pname, value, client }) => (
      event,
      index,
      comparator
    ) =>
      client.mutate({
        mutation: exportPcoFiltersMutation,
        variables: { pcname, pname, comparator, value },
      }),
  })
)

const PcoComparator = ({
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

export default enhance(PcoComparator)
