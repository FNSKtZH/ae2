// @flow
import React, { useCallback } from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import removeExportTaxPropertyMutation from '../../../removeExportTaxPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportTaxPropertiesListItem = ({
  client,
  properties,
}: {
  client: Object,
  properties: Object,
}) => {
  const { taxname, pname } = properties
  const onClick = useCallback(
    () =>
      client.mutate({
        mutation: removeExportTaxPropertyMutation,
        variables: {
          taxname,
          pname,
        },
      }),
    [properties],
  )

  return (
    <li key={`${taxname}: ${pname}`}>
      {`${taxname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default enhance(ExportTaxPropertiesListItem)
