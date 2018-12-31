// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import removeExportRcoPropertyMutation from '../../removeExportRcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportRcoPropertiesListItems = ({
  client,
  exportRcoProperties,
}: {
  client: Object,
  exportRcoProperties: Array<Object>,
}) =>
  exportRcoProperties.map(({ pcname, relationtype, pname }) => (
    <li key={`${pcname} - ${relationtype}: ${pname}`}>
      {`${pcname} - ${relationtype}: ${pname}`}
      <ResetSpan
        onClick={() => {
          client.mutate({
            mutation: removeExportRcoPropertyMutation,
            variables: {
              pcname,
              relationtype,
              pname,
            },
          })
        }}
      >
        zurücksetzen
      </ResetSpan>
    </li>
  ))

export default enhance(ExportRcoPropertiesListItems)
