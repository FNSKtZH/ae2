// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import { observer, inject } from 'mobx-react'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import HowTo from './HowTo'
import CombineTaxonomies from './CombineTaxonomies'

import exportCategoriesMutation from '../../../modules/exportCategoriesMutation'
import exportCategoriesGql from '../../../modules/exportCategoriesGql'

const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})

const enhance = compose(
  inject('store'),
  withApollo,
  exportCategoriesData,
  withHandlers({
    onCheck: props => (event, isChecked) => {
      const { client, exportCategoriesData } = props
      const { exportCategories } = exportCategoriesData
      const { name } = event.target
      const categories = isChecked
        ? [...exportCategories, name]
        : exportCategories.filter(c => c !== name)
      client.mutate({
        mutation: exportCategoriesMutation,
        variables: { value: categories },
      })
    },
  }),
  observer
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledCheckbox = styled(Checkbox)`margin-bottom: inherit;`

const Categories = ({
  store,
  exportCategoriesData
  onCheck,
}: {
  store:Object,
  exportCategoriesData: Object,
  onCheck: () => void,
}) => {
  const { exportCategories } = exportCategoriesData
  return(
  <Container>
    <HowTo />
    {store.categories.map(category => (
      <StyledCheckbox
        key={category}
        name={category}
        label={category}
        checked={store.export.categories.includes(category)}
        onCheck={onCheck}
      />
    ))}
    <CombineTaxonomies />
  </Container>
)}

export default enhance(Categories)
