//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import Measure from 'react-measure'

import Comparator from './TaxComparator'
import TaxFieldValue from './TaxFieldValue'
import exportTaxFiltersData from '../../exportTaxFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const enhance = compose(withState('width', 'setWidth', 0), exportTaxFiltersData)

type Props = {
  taxname: String,
  pname: String,
  jsontype: String,
  exportTaxFiltersData: Object,
  width: Number,
  setWidth: () => void,
}
class TaxField extends React.Component<Props> {
  render() {
    const {
      taxname,
      pname,
      jsontype,
      exportTaxFiltersData,
      width,
      setWidth,
    } = this.props
    const { exportTaxFilters } = exportTaxFiltersData
    const exportTaxFilter = exportTaxFilters.find(
      x => x.taxname === taxname && x.pname === pname
    ) || { comparator: null, value: null }
    const { comparator, value } = exportTaxFilter

    return (
      <Measure
        bounds
        onResize={contentRect => setWidth(contentRect.bounds.width)}
      >
        {({ measureRef }) => (
          <Container innerRef={measureRef}>
            <TaxFieldValue
              key={`${taxname}/${pname}/${jsontype}`}
              taxname={taxname}
              pname={pname}
              value={value}
              jsontype={jsontype}
              comparator={comparator}
              width={width - 32}
            />
            {value !== undefined &&
              value !== null && (
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
}

export default enhance(TaxField)
