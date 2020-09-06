import React, { useCallback, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import ComparatorSelect from '../../ComparatorSelect'
import mobxStoreContext from './../../../../../../mobxStoreContext'

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
const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})

const Comparator = ({ comparator, classes, taxname, pname, value }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { setTaxFilters } = mobxStore.export

  const onChange = useCallback(
    (event) =>
      setTaxFilters({
        taxname,
        pname,
        comparator: event.target.value || 'ILIKE',
        value,
      }),
    [setTaxFilters, taxname, pname, value],
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

export default withStyles(styles)(observer(Comparator))
