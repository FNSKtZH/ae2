import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'

import Comparator from './Comparator'
import Value from './Value'
import mobxStoreContext from '../../../../../../mobxStoreContext'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  width: ${(props) => `${props['data-width']}%`};
  > div {
    height: auto;
  }
`

const TaxField = ({ taxname, pname, jsontype, columns, width }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxFilters } = mobxStore.export

  const exportTaxFilter = taxFilters.find(
    (x) => x.taxname === taxname && x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = exportTaxFilter

  const containerWidth = 100 / columns

  return (
    <Container data-width={containerWidth}>
      <Value
        key={`${taxname}/${pname}/${jsontype}`}
        taxname={taxname}
        pname={pname}
        value={value}
        jsontype={jsontype}
        comparator={comparator}
        width={width - 32}
      />
      {value !== undefined && value !== null && (
        <Comparator
          taxname={taxname}
          pname={pname}
          comparator={comparator}
          value={value}
        />
      )}
    </Container>
  )
}

export default withResizeDetector(observer(TaxField))
