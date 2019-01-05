//@flow
import React, { useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'

import exportTaxFiltersMutation from '../../../../exportTaxFiltersMutation'
import ComparatorSelect from '../../ComparatorSelect'

const Container = styled.div`
  flex-basis: 150px;
  flex-shrink: 0;
  flex-grow: 1;
`
const StyledFormControl = styled(FormControl)`
  margin: 0 !important;
  width: 100%;
  > label {
    padding-left: 8px;
  }
`
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

const enhance = compose(
  withApollo,
  withStyles(styles),
)

const Comparator = ({
  comparator,
  classes,
  taxname,
  pname,
  value,
  client,
}: {
  comparator: string,
  classes: Object,
  taxname: string,
  pname: string,
  value: string,
  client: Object,
}) => {
  const onChange = useCallback(
    event =>
      client.mutate({
        mutation: exportTaxFiltersMutation,
        variables: {
          taxname,
          pname,
          comparator: event.target.value || 'ILIKE',
          value,
        },
      }),
    [taxname, pname, value],
  )

  return (
    <Container>
      <StyledFormControl className={classes.formControl}>
        <InputLabel htmlFor="v-op">Vergleichs-Operator</InputLabel>
        <ComparatorSelect comparator={comparator} onChange={onChange} />
      </StyledFormControl>
    </Container>
  )
}

export default enhance(Comparator)
