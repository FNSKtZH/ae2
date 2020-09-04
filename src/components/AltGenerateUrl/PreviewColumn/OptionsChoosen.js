import React, { useCallback, useContext } from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import TaxProperties from './TaxProperties'
import PcoProperties from './PcoProperties'
import RcoProperties from './RcoProperties'
import mobxStoreContext from '../../../mobxStoreContext'
import getConstants from '../../../modules/constants'
const constants = getConstants()

const Container = styled.div`
  margin: 0;
  padding: 8px 8px 0 8px;
  ul {
    margin-bottom: 5px;
  }
  ul > li > ul {
    margin-top: 0;
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
  margin-left: 0 !important;
  margin-top: 0 !important;
`

const OptionsChoosen = () => {
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
      <StyledButton onClick={onClickResetAll} variant="outlined">
        alle Optionen zurücksetzen
      </StyledButton>
    </Container>
  )
}

export default observer(OptionsChoosen)
