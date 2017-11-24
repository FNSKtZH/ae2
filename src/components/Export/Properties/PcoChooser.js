//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportPcoPropertiesMutation from '../../../modules/exportPcoPropertiesMutation'

const Container = styled.div`
  margin-left: 16px;
`

const enhance = compose(
  withApollo,
  withHandlers({
    onCheck: ({ propertyCollectionName, propertyName, client }) => (
      event,
      isChecked
    ) => {
      // TODO
      // add or remove object with info
      client.mutate({
        mutation: exportPcoPropertiesMutation,
        variables: { value: isChecked },
      }),
    },
  })
)

const PcoChooser = ({
  propertyCollectionName,
  propertyName,
  jsontype,
  count,
  onCheck,
}: {
  propertyCollectionName: string,
  propertyName: string,
  jsontype: string,
  count: number,
  onCheck: () => {},
}) => {
  return (
    <Container>
      <Checkbox label="alle" checked={false} onCheck={onCheck} />
    </Container>
  )
}

export default enhance(PcoChooser)
