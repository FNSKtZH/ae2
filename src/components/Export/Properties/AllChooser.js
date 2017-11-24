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
    onCheck: () => (event, isChecked) => {},
  })
)

const AllChooser = () => {
  return (
    <Container>
      <Checkbox
        label="alle"
        checked={false}
        onCheck={() => console.log('todo: check all properties')}
      />
    </Container>
  )
}

export default enhance(AllChooser)
