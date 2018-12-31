// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import removeExportTaxPropertyMutation from '../../removeExportTaxPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportTaxPropertiesListItems = ({
  client,
  exportTaxProperties,
}: {
  client: Object,
  exportTaxProperties: Array<Object>,
}) => {
  return exportTaxProperties.map(({ taxname, pname }) => (
    <li key={`${taxname}: ${pname}`}>
      {`${taxname}: ${pname}`}
      <ResetSpan
        onClick={() => {
          client.mutate({
            mutation: removeExportTaxPropertyMutation,
            variables: {
              taxname,
              pname,
            },
          })
        }}
      >
        zurücksetzen
      </ResetSpan>
    </li>
  ))
}

export default enhance(ExportTaxPropertiesListItems)
