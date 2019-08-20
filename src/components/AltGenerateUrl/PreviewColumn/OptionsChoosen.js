import React, { useCallback, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import constants from '../../../modules/constants'
import TaxProperties from './TaxProperties'
import PcoProperties from './PcoProperties'
import RcoProperties from './RcoProperties'
import mobxStoreContext from '../../../mobxStoreContext'

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
})
const Container = styled.div`
  margin: 0;
  padding: 8px 8px 0 8px;
  ul {
    margin-bottom: 5px;
  }
  li {
    margin-bottom: 4px;
  }
  ul > li:first-child {
    padding-top: 4px;
  }
`
const Title = styled.div`
  font-weight: bold;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
`

const enhance = compose(
  withStyles(styles),
  observer,
)

const OptionsChoosen = ({ classes }) => {
  const mobxStore = useContext(mobxStoreContext)
  const {
    setTaxonomies,
    resetRcoProperties,
    rcoProperties,
    pcoProperties,
    resetPcoProperties,
    taxProperties,
    resetTaxProperties,
  } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const onClickResetAll = useCallback(() => {
    setTaxonomies([])
    resetPcoProperties()
    resetRcoProperties()
    resetTaxProperties()
  }, [
    resetPcoProperties,
    resetRcoProperties,
    resetTaxProperties,
    setTaxonomies,
  ])

  const noDataChoosen =
    [...exportTaxonomies, ...taxProperties, ...pcoProperties, ...rcoProperties]
      .length === 0

  if (noDataChoosen) return null

  return (
    <Container>
      <Title title="Gewählte Optionen">Gewählte Optionen</Title>
      <ul>
        <li>{`Taxonomien (welche das Artenlistentool erwartet): ${constants.altTaxonomies.join(
          ', ',
        )}`}</li>
        {rcoProperties.length > 0 && (
          <li>Eigenschaften von Beziehungen mit | getrennt in einer Zeile</li>
        )}
        <li>
          {`Eigenschaften:${
            [...taxProperties, ...pcoProperties, ...rcoProperties].length === 0
              ? ' keine'
              : ''
          }`}
          <ul>
            <TaxProperties properties={taxProperties} />
            <PcoProperties properties={pcoProperties} />
            <RcoProperties properties={rcoProperties} />
          </ul>
        </li>
      </ul>
      <StyledButton className={classes.button} onClick={onClickResetAll}>
        alle Optionen zurücksetzen
      </StyledButton>
    </Container>
  )
}

export default enhance(OptionsChoosen)
