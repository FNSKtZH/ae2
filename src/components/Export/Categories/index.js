// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'

import HowTo from './HowTo'
import CombineTaxonomies from './CombineTaxonomies'

import exportCategoriesMutation from '../../../modules/exportCategoriesMutation'
import exportCategoriesGql from '../../../modules/exportCategoriesGql'

const exportCategoriesData = graphql(exportCategoriesGql, {
  name: 'exportCategoriesData',
})

const enhance = compose(
  withApollo,
  exportCategoriesData,
  withHandlers({
    onCheck: ({ client, exportCategoriesData }) => (event, isChecked) => {
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
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledCheckbox = styled(Checkbox)`margin-bottom: inherit;`

const Categories = ({
  data,
  exportCategoriesData,
  onCheck,
}: {
  data: Object,
  exportCategoriesData: Object,
  onCheck: () => void,
}) => {
  const exportCategories = exportCategoriesData.exportCategories || []
  const categories = get(data, 'allCategories.nodes', []).map(c => c.name)

  return (
    <Container>
      <HowTo />
      {categories.map(category => (
        <StyledCheckbox
          key={category}
          name={category}
          label={category}
          checked={exportCategories.includes(category)}
          onCheck={onCheck}
        />
      ))}
      <CombineTaxonomies data={data} />
    </Container>
  )
}

export default enhance(Categories)
