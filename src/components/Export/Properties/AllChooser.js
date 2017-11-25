//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

const Container = styled.div`
  margin-left: 16px;
`

const enhance = compose(
  withHandlers({
    onCheck: ({ properties }) => (event, isChecked) => {
      console.log('todo: check all properties')
    },
  })
)

const AllChooser = ({
  onCheck,
  properties,
}: {
  onCheck: () => {},
  properties: ?Array<Object>,
}) => {
  return (
    <Container>
      <Checkbox label="alle" checked={false} onCheck={onCheck} />
    </Container>
  )
}

export default enhance(AllChooser)
