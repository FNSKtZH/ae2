//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'

import addExportTaxPropertyMutation from '../../../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../../../removeExportTaxPropertyMutation'
import withExportTaxPropertiesData from '../../../../withExportTaxPropertiesData'

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
  withExportTaxPropertiesData,
)

const TaxChooser = ({
  taxname,
  pname,
  jsontype,
  count,
  exportTaxPropertiesData,
  client,
}: {
  taxname: string,
  pname: string,
  jsontype: string,
  count: number,
  exportTaxPropertiesData: Object,
  client: Object,
}) => {
  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      client.mutate({
        mutation,
        variables: { taxname, pname },
      })
    },
    [taxname, pname],
  )

  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []
  const checked =
    exportTaxProperties.filter(
      x => /*x.taxname === taxname && */ x.pname === pname,
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
