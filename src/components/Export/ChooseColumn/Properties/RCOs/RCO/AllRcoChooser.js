//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'

import addExportRcoPropertyMutation from '../../../../addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../../removeExportRcoPropertyMutation'
import withExportRcoPropertiesData from '../../../../withExportRcoPropertiesData'

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
  withExportRcoPropertiesData,
)

const AllRcoChooser = ({
  properties,
  exportRcoPropertiesData,
  client,
}: {
  properties: Array<Object>,
  exportRcoPropertiesData: Object,
  client: Object,
}) => {
  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const relationtype = p.relationType
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { pcname, relationtype, pname },
        })
      })
    },
    [properties],
  )

  const exportRcoProperties = exportRcoPropertiesData.exportRcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportRcoProperties.filter(
        x =>
          x.pcname === p.propertyCollectionName &&
          x.relationtype === p.relationType &&
          x.pname === p.propertyName,
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

export default enhance(AllRcoChooser)
