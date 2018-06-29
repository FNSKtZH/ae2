//@flow
import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportTaxPropertyMutation from '../../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../../removeExportTaxPropertyMutation'
import exportTaxPropertiesData from '../../../exportTaxPropertiesData'

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
  exportTaxPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => async (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      for (let p of properties) {
        client.mutate({
          mutation,
          variables: {
            taxname: p.taxonomyName,
            pname: p.propertyName 
          },
        })
      }
    },
  })
)

const AllTaxChooser = ({
  onCheck,
  properties,
  exportTaxPropertiesData,
}: {
  onCheck: () => {},
  properties: Array<Object>,
  exportTaxPropertiesData: Object,
}) => {
  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []
  const checkedArray = properties.map(
    p =>
      exportTaxProperties.filter(
        x => x.taxname === p.taxname && x.pname === p.propertyName
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

export default enhance(AllTaxChooser)
