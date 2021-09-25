import React, { useCallback, useContext } from 'react'
import withStyles from '@mui/styles/withStyles'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import ComparatorSelect from '../../../ComparatorSelect'
import mobxStoreContext from '../../../../../../../mobxStoreContext'

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

const RcoComparator = ({
  pcname,
  relationtype,
  pname,
  value,
  comparator,
  classes,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { setRcoFilters } = mobxStore.export

  const onChange = useCallback(
    (event) =>
      setRcoFilters({
        pcname,
        relationtype,
        pname,
        comparator: event.target.value,
        value,
      }),
    [setRcoFilters, pcname, relationtype, pname, value],
  )

  return (
    <Container>
      <StyledFormControl className={classes.formControl} variant="standard">
        <InputLabel htmlFor="v-op">Vergleichs-Operator</InputLabel>
        <ComparatorSelect comparator={comparator} onChange={onChange} />
      </StyledFormControl>
    </Container>
  )
}

export default withStyles(styles)(observer(RcoComparator))
