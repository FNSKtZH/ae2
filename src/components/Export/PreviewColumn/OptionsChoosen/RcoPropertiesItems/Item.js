// @flow
import React, { useCallback } from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import removeExportRcoPropertyMutation from '../../../removeExportRcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportRcoPropertiesListItem = ({
  client,
  properties,
}: {
  client: Object,
  properties: Object,
}) => {
  const { pcname, relationtype, pname } = properties
  const onClick = useCallback(
    () =>
      client.mutate({
        mutation: removeExportRcoPropertyMutation,
        variables: {
          pcname,
          relationtype,
          pname,
        },
      }),
    [properties],
  )

  return (
    <li>
      {`${pcname} - ${relationtype}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default enhance(ExportRcoPropertiesListItem)
