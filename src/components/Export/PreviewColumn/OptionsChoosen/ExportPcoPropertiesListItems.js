// @flow
import React from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import removeExportPcoPropertyMutation from '../../removeExportPcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportPcoPropertiesListItems = ({
  client,
  exportPcoProperties,
}: {
  client: Object,
  exportPcoProperties: Array<Object>,
}) =>
  exportPcoProperties.map(({ pcname, pname }, i) => (
    <li key={`${pcname}: ${pname}`}>
      {`${pcname}: ${pname}`}
      <ResetSpan
        onClick={() => {
          client.mutate({
            mutation: removeExportPcoPropertyMutation,
            variables: {
              pcname,
              pname,
            },
          })
        }}
      >
        zurücksetzen
      </ResetSpan>
    </li>
  ))

export default enhance(ExportPcoPropertiesListItems)
