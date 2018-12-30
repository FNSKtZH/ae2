//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'

import addExportPcoPropertyMutation from '../../../../addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../../removeExportPcoPropertyMutation'
import withExportPcoPropertiesData from '../../../../withExportPcoPropertiesData'

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
  withExportPcoPropertiesData,
)

const AllPcoChooser = ({
  properties,
  exportPcoPropertiesData,
  client,
}: {
  properties: Array<Object>,
  exportPcoPropertiesData: Object,
  client: Object,
}) => {
  const onCheck = useCallback(
    (event, isChecked) => {
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
    [properties],
  )

  const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportPcoProperties.filter(
        x =>
          x.pcname === p.propertyCollectionName && x.pname === p.propertyName,
      ).length > 0,
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
