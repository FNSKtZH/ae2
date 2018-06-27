//@flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportPcoFiltersMutation from '../../exportPcoFiltersMutation'
import ComparatorSelect from './ComparatorSelect'

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
  withHandlers({
    onChange: ({ pcname, pname, value, client }) => event => {
      client.mutate({
        mutation: exportPcoFiltersMutation,
        variables: { pcname, pname, comparator: event.target.value, value },
      })
    },
  })
)

const PcoComparator = ({
  comparator,
  onChange,
  classes,
}: {
  comparator: String,
  onChange: () => {},
  classes: Object,
}) => {
  return (
    <Container>
      <StyledFormControl className={classes.formControl}>
        <InputLabel htmlFor="v-op">Vergleichs-Operator</InputLabel>
        <ComparatorSelect
          comparator={comparator}
          onChange={onChange}
        />
      </StyledFormControl>
    </Container>
  )
}

export default enhance(PcoComparator)
