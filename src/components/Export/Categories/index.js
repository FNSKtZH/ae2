// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'

import HowTo from './HowTo'

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledCheckbox = styled(Checkbox)`
  margin-bottom: inherit;
`

const Categories = ({ categories }: { categories: Array<Object> }) => {
  console.log()
  return (
    <Container>
      <HowTo />
      {categories.map(c => <StyledCheckbox label={c.name} />)}
    </Container>
  )
}

export default Categories
