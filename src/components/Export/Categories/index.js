// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import HowTo from './HowTo'
import CombineTaxonomies from './CombineTaxonomies'

const enhance = compose(
  inject('store'),
  withHandlers({
    onCheck: props => (event, isChecked) => {
      const { categories, setCategories } = props.store.export
      const { name } = event.target
      if (isChecked) {
        setCategories([...categories, name])
      } else {
        setCategories(categories.filter(c => c !== name))
      }
    },
  }),
  observer
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledCheckbox = styled(Checkbox)`
  margin-bottom: inherit;
`

const Categories = ({
  store,
  onCheck,
}: {
  store: Object,
  onCheck: () => void,
}) =>
  <Container>
    <HowTo />
    {store.categories.map(category =>
      <StyledCheckbox
        key={category}
        name={category}
        label={category}
        checked={store.export.categories.includes(category)}
        onCheck={onCheck}
      />
    )}
    <CombineTaxonomies />
  </Container>

export default enhance(Categories)
