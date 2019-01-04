//@flow
import React, { useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'

import exportRcoFiltersMutation from '../../../../../exportRcoFiltersMutation'
import ComparatorSelect from '../../../ComparatorSelect'

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

const RcoComparator = ({
  pcname,
  relationtype,
  pname,
  value,
  comparator,
  classes,
  client,
}: {
  pcname: string,
  relationtype: string,
  pname: string,
  value: string,
  comparator: String,
  classes: Object,
  client: Object,
}) => {
  const onChange = useCallback(
    event =>
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: {
          pcname,
          relationtype,
          pname,
          comparator: event.target.value,
          value,
        },
      }),
    [pcname, relationtype, pname, value],
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

export default enhance(RcoComparator)
