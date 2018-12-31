// @flow
import React, { useCallback } from 'react'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

import removeExportPcoPropertyMutation from '../../../removeExportPcoPropertyMutation'

const ResetSpan = styled.span`
  margin-left: 8px;
  font-weight: 100;
  font-style: italic;
  cursor: pointer;
  text-decoration: underline dotted rgba(0, 0, 0, 0.3);
`

const enhance = compose(withApollo)

const ExportPcoPropertiesListItem = ({
  client,
  properties,
}: {
  client: Object,
  properties: Object,
}) => {
  const { pcname, pname } = properties
  const onClick = useCallback(
    () =>
      client.mutate({
        mutation: removeExportPcoPropertyMutation,
        variables: {
          pcname,
          pname,
        },
      }),
    [pcname, pname],
  )

  return (
    <li key={`${pcname}: ${pname}`}>
      {`${pcname}: ${pname}`}
      <ResetSpan onClick={onClick}>zurücksetzen</ResetSpan>
    </li>
  )
}

export default enhance(ExportPcoPropertiesListItem)
