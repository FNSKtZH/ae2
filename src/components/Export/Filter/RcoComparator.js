//@flow
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportRcoFiltersMutation from '../../../modules/exportRcoFiltersMutation'

const Container = styled.div``
const StyledSelectField = styled(SelectField)`
  width: 150px !important;
`

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ pCName, pName, value, client }) => (
      event,
      index,
      comparator
    ) =>
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: { pCName, pName, comparator, value },
      }),
  })
)

const RcoComparator = ({
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
        <MenuItem value={null} primaryText="" />
        <MenuItem value="=" primaryText="&#61;" />
        <MenuItem value=">" primaryText="&#62;" />
        <MenuItem value=">=" primaryText="&#62;&#61;" />
        <MenuItem value="<" primaryText="&#60;" />
        <MenuItem value="<=" primaryText="&#60;&#61;" />
      </StyledSelectField>
    </Container>
  )
}

export default enhance(RcoComparator)
