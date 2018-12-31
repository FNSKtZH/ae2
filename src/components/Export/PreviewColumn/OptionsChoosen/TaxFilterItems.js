// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import exportTaxFiltersMutation from '../../exportTaxFiltersMutation'
import booleanToJaNein from '../../../../modules/booleanToJaNein'

const FilterValueSpan = styled.span`
  background-color: #dadada;
  padding: 1px 8px;
  margin-left: 5px;
  border-radius: 3px;
`
const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportTaxFilterListItems = ({
  exportTaxFilters,
  client,
}: {
  exportTaxFilters: Array<Object>,
  client: Object,
}) =>
  exportTaxFilters.map(({ taxname, pname, comparator, value }) => (
    <li key={`${taxname}: ${pname}`}>
      {`${taxname}: ${pname} ${comparator ? `${comparator}` : ''}`}
      <FilterValueSpan>
        {typeof value === 'boolean' ? booleanToJaNein(value) : value}
      </FilterValueSpan>
      <ResetSpan
        onClick={() => {
          client.mutate({
            mutation: exportTaxFiltersMutation,
            variables: {
              taxname,
              pname,
              comparator: '',
              value: '',
            },
          })
        }}
      >
        zurücksetzen
      </ResetSpan>
    </li>
  ))

export default enhance(ExportTaxFilterListItems)
