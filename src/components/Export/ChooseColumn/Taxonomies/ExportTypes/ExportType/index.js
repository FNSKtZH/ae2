// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import get from 'lodash/get'

import exportTypeMutation from '../../../../exportTypeMutation'
import withExportTypeData from '../../../../withExportTypeData'
import exportTaxonomiesMutation from '../../../../exportTaxonomiesMutation'
import withExportTaxonomiesData from '../../../../withExportTaxonomiesData'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'
import Taxonomies from '../Taxonomies'

const exportTypes = ['Arten', 'Lebensräume']
const exportTypeTAXToReadable = {
  ART: 'Arten',
  LEBENSRAUM: 'Lebensräume',
}

const TypeContainer = styled.div``
const TaxContainer = styled.div`
  margin-left: 39px;
  margin-bottom: 10px;
  margin-top: 3px;
`
const TaxTitle = styled.div`
  margin-left: -5px;
`
const TypeLabel = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const enhance = compose(
  withApollo,
  withExportTaxonomiesData,
  withExportTypeData,
)

const ExportTypes = ({
  exportTypeData,
  exportTaxonomiesData,
  client,
  type,
  taxonomies,
}: {
  exportTypeData: Object,
  exportTaxonomiesData: Object,
  client: Object,
  type: string,
  taxonomies: Array<Object>,
}) => {
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])

  const onCheckType = useCallback(
    async (event, isChecked) => {
      const { name } = event.target
      if (isChecked) {
        await client.mutate({
          mutation: exportTypeMutation,
          variables: { value: name },
        })
        // check if only one Taxonomy exists
        // if so, check it
        if (taxonomies.length === 1) {
          const taxonomyName = taxonomies[0].taxonomyName
          await client.mutate({
            mutation: exportTaxonomiesMutation,
            variables: { value: [...exportTaxonomies, taxonomyName] },
          })
        }
        // check if taxonomy(s) of other type was choosen
        // if so: uncheck
        const exportTaxonomiesWithoutOtherType = exportTaxonomies.filter(
          t => exportTypeTAXToReadable[t.type] === name,
        )
        if (exportTaxonomiesWithoutOtherType.length < exportTaxonomies.length) {
          await client.mutate({
            mutation: exportTaxonomiesMutation,
            variables: { value: exportTaxonomiesWithoutOtherType },
          })
        }
      } else {
        await client.mutate({
          mutation: exportTypeMutation,
          variables: { value: exportTypes.find(t => t !== name) },
        })
        // uncheck all taxonomies of this type
        const taxonomiesToUncheck = taxonomies.map(t => t.taxonomyName)
        const remainingTaxonomies = exportTaxonomies.filter(
          t => !taxonomiesToUncheck.includes(t),
        )
        await client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: remainingTaxonomies },
        })
      }
    },
    [taxonomies, exportTaxonomies],
  )

  const exportType = get(exportTypeData, 'exportType', null)

  return (
    <ErrorBoundary>
      <TypeContainer>
        <TypeLabel
          control={
            <Checkbox
              color="primary"
              name={type}
              checked={exportType === type}
              onChange={onCheckType}
            />
          }
          label={type}
        />
        {exportType === type && (
          <TaxContainer>
            <TaxTitle>
              {taxonomies.length === 1 ? 'Taxonomie:' : 'Taxonomien:'}
            </TaxTitle>
            <FormGroup>
              <Taxonomies taxonomies={taxonomies} />
            </FormGroup>
          </TaxContainer>
        )}
      </TypeContainer>
    </ErrorBoundary>
  )
}

export default enhance(ExportTypes)
