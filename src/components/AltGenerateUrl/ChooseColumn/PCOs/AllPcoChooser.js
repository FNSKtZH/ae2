//@flow
import React from 'react'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportPcoPropertyMutation from '../../addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../removeExportPcoPropertyMutation'
import exportPcoPropertiesData from '../../exportPcoPropertiesData'

const Container = styled.div`
  margin-bottom: 16px;
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const enhance = compose(
  withApollo,
  exportPcoPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { pcname, pname },
        })
      })
    },
  })
)

const AllPcoChooser = ({
  onCheck,
  properties,
  exportPcoPropertiesData,
}: {
  onCheck: () => {},
  properties: Array<Object>,
  exportPcoPropertiesData: Object,
}) => {
  const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportPcoProperties.filter(
        x => x.pcname === p.propertyCollectionName && x.pname === p.propertyName
      ).length > 0
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label="alle"
      />
    </Container>
  )
}

export default enhance(AllPcoChooser)
