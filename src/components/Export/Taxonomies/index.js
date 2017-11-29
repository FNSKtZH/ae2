// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import { graphql, withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import get from 'lodash/get'

import exportTaxonomiesMutation from '../../../modules/exportTaxonomiesMutation'
import exportTaxonomiesGql from '../../../modules/exportTaxonomiesGql'

const exportTaxonomiesData = graphql(exportTaxonomiesGql, {
  name: 'exportTaxonomiesData',
})

const enhance = compose(
  withApollo,
  exportTaxonomiesData,
  withHandlers({
    onCheck: ({ client, exportTaxonomiesData }) => (event, isChecked) => {
      const { exportTaxonomies } = exportTaxonomiesData
      const { name } = event.target
      const taxonomies = isChecked
        ? [...exportTaxonomies, name]
        : exportTaxonomies.filter(c => c !== name)
      client.mutate({
        mutation: exportTaxonomiesMutation,
        variables: { value: taxonomies },
      })
    },
  })
)

const Container = styled.div`
  padding: 5px 10px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const StyledCheckbox = styled(Checkbox)`
  margin-bottom: inherit;
`
const PaperTextContainer = styled.div`
  padding: 16px;
`
const PropertyTextDiv = styled.div`
  padding-bottom: 5px;
`

const Taxonomies = ({
  data,
  exportTaxonomiesData,
  onCheck,
}: {
  data: Object,
  exportTaxonomiesData: Object,
  onCheck: () => void,
}) => {
  const exportTaxonomies = exportTaxonomiesData.exportTaxonomies || []
  const { loading } = data
  const taxonomies = get(data, 'allTaxonomies.nodes', []).map(c => c.name)
  let paperBackgroundColor = '#1565C0'
  let textProperties = 'Wählen Sie eine oder mehrere Gruppen.'
  if (loading) {
    textProperties = 'Die Taxonomien werden ergänzt...'
  }
  if (!loading && exportTaxonomies.length > 0) {
    paperBackgroundColor = '#2E7D32'
    textProperties = 'Die Taxonomien wurden geladen.'
  }
  const paperStyle = {
    width: '100%',
    color: 'white',
    backgroundColor: paperBackgroundColor,
    marginBottom: '10px',
  }

  return (
    <Container>
      {taxonomies.map(category => (
        <StyledCheckbox
          key={category}
          name={category}
          label={category}
          checked={exportTaxonomies.includes(category)}
          onCheck={onCheck}
        />
      ))}
      <Paper style={paperStyle} zDepth={1}>
        <PaperTextContainer>
          <PropertyTextDiv>{textProperties}</PropertyTextDiv>
        </PaperTextContainer>
      </Paper>
    </Container>
  )
}

export default enhance(Taxonomies)
