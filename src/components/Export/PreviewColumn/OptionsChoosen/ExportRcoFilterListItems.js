// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import exportRcoFiltersMutation from '../../exportRcoFiltersMutation'
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

const ExportRcoFilterListItems = ({
  client,
  exportRcoFilters,
}: {
  client: Object,
  exportRcoFilters: Array<Object>,
}) =>
  exportRcoFilters.map(
    ({ pcname, relationtype, pname, comparator, value }, i) => (
      <li key={i}>
        {`${pcname}: ${pname} ${comparator ? `${comparator}` : ''}`}
        <FilterValueSpan>
          {typeof value === 'boolean' ? booleanToJaNein(value) : value}
        </FilterValueSpan>
        <ResetSpan
          onClick={() => {
            client.mutate({
              mutation: exportRcoFiltersMutation,
              variables: {
                pcname,
                relationtype,
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
    ),
  )

export default enhance(ExportRcoFilterListItems)
