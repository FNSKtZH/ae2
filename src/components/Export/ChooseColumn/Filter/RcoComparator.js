//@flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportRcoFiltersMutation from '../../exportRcoFiltersMutation'

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
const StyledSelect = styled(Select)`
  > div {
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
    onChange: ({ pcname, pname, value, client }) => event =>
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: { pcname, pname, comparator: event.target.value, value },
      }),
  })
)

const RcoComparator = ({
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
        <StyledSelect
          value={comparator}
          onChange={onChange}
          input={<Input id="v-op" />}
        >
          <MenuItem value="ILIKE">enthalten</MenuItem>
          <MenuItem value="LIKE">
            enthalten (Grosschreibung berücksichtigt)
          </MenuItem>
          <MenuItem value="=">&#61; (genau gleich)</MenuItem>
          <MenuItem value=">">&#62;</MenuItem>
          <MenuItem value=">=">&#62;&#61;</MenuItem>
          <MenuItem value="<">&#60;</MenuItem>
          <MenuItem value="<=">&#60;&#61;</MenuItem>
        </StyledSelect>
      </StyledFormControl>
    </Container>
  )
}

export default enhance(RcoComparator)
