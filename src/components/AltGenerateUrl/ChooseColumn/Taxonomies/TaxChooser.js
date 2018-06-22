//@flow
import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportTaxPropertyMutation from '../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../removeExportTaxPropertyMutation'
import exportTaxPropertiesData from '../../exportTaxPropertiesData'

const Container = styled.div``
const Count = styled.span`
  font-size: xx-small;
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
    onCheck: ({ taxname, pname, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      client.mutate({
        mutation,
        variables: { taxname, pname },
      })
    },
  })
)

const TaxChooser = ({
  taxname,
  pname,
  jsontype,
  count,
  onCheck,
  exportTaxPropertiesData,
}: {
  taxname: string,
  pname: string,
  jsontype: string,
  count: number,
  onCheck: () => {},
  exportTaxPropertiesData: Object,
}) => {
  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []
  const checked =
    exportTaxProperties.filter(
      x => /*x.taxname === taxname && */ x.pname === pname
    ).length > 0

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label={
          <div>
            {pname} <Count title="Anzahl Objekte">{`(${count} Objekte)`}</Count>
          </div>
        }
      />
    </Container>
  )
}

export default enhance(TaxChooser)
