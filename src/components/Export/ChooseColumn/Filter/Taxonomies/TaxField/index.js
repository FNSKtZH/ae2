//@flow
import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import Measure from 'react-measure'
import { observer } from 'mobx-react-lite'

import Comparator from './Comparator'
import Value from './Value'
import mobxStoreContext from '../../../../../../mobxStoreContext'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const TaxField = ({
  taxname,
  pname,
  jsontype,
}: {
  taxname: String,
  pname: String,
  jsontype: String,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxFilters } = mobxStore.export

  const [width, setWidth] = useState(0)

  const exportTaxFilter = taxFilters.find(
    x => x.taxname === taxname && x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = exportTaxFilter

  const onResize = useCallback(contentRect =>
    setWidth(contentRect.bounds.width),
  )

  return (
    <Measure bounds onResize={onResize}>
      {({ measureRef }) => (
        <Container ref={measureRef}>
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
      )}
    </Measure>
  )
}

export default observer(TaxField)
