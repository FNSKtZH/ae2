//@flow
import React from 'react'
import { withStyles } from 'material-ui-next/styles'
import Input, { InputLabel } from 'material-ui-next/Input'
import { MenuItem } from 'material-ui-next/Menu'
import { FormControl } from 'material-ui-next/Form'
import Select from 'material-ui-next/Select'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportPcoFiltersMutation from '../../exportPcoFiltersMutation'

const Container = styled.div``
const StyledFormControl = styled(FormControl)`
  width: 150px !important;
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
        <Select
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
        </Select>
      </StyledFormControl>
    </Container>
  )
}

export default enhance(PcoComparator)
