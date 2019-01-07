// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import exportTypeMutation from '../../../exportTypeMutation'
import withExportTypeData from '../../../withExportTypeData'
import exportTaxonomiesMutation from '../../../exportTaxonomiesMutation'
import withExportTaxonomiesData from '../../../withExportTaxonomiesData'
import withTaxonomiesData from '../withTaxonomiesData'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

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
const TaxonomyLabel = styled(FormControlLabel)`
  height: 33px;
  min-height: 33px;
  margin-left: -20px !important;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const enhance = compose(
  withApollo,
  withTaxonomiesData,
  withExportTaxonomiesData,
  withExportTypeData,
)

const ExportTypes = ({
  taxonomiesData,
  exportTypeData,
  exportTaxonomiesData,
  client,
}: {
  taxonomiesData: Object,
  exportTypeData: Object,
  exportTaxonomiesData: Object,
  client: Object,
}) => {
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
  const allTaxonomies = sortBy(
    get(taxonomiesData, 'allTaxonomies.nodes', []),
    'name',
  )

  const onCheckType = useCallback(
    async (event, isChecked) => {
      const { name } = event.target
      const taxonomiesOfType = allTaxonomies.filter(
        t => t.type.toLowerCase() === name.toLowerCase(),
      )
      if (isChecked) {
        await client.mutate({
          mutation: exportTypeMutation,
          variables: { value: name },
        })
        // check if only one Taxonomy exists
        // if so, check it
        if (taxonomiesOfType.length === 1) {
          const taxonomyName = taxonomiesOfType[0].taxonomyName
          const taxonomies = [...exportTaxonomies, taxonomyName]
          await client.mutate({
            mutation: exportTaxonomiesMutation,
            variables: { value: taxonomies },
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
        const taxonomiesToUncheck = taxonomiesOfType.map(t => t.taxonomyName)
        const remainingTaxonomies = exportTaxonomies.filter(
          t => !taxonomiesToUncheck.includes(t),
        )
        await client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: remainingTaxonomies },
        })
      }
    },
    [taxonomiesData, exportTaxonomiesData],
  )
  const onCheckTaxonomy = useCallback(
    async (event, isChecked) => {
      const { name } = event.target
      let taxonomies
      if (isChecked) {
        taxonomies = [...exportTaxonomies, name]
        await client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: taxonomies },
        })
      } else {
        taxonomies = exportTaxonomies.filter(c => c !== name)
        await client.mutate({
          mutation: exportTaxonomiesMutation,
          variables: { value: taxonomies },
        })
        // check if sole type is left
        // and this was only taxonomy
        // if so: uncheck type too
        const thisTaxonomy = allTaxonomies.find(t => t.name === name)
        if (taxonomies.length === 0) {
          // this was the only taxonomy in this type
          // it makes sense to also uncheck the type
          const value = thisTaxonomy.type === 'ART' ? 'Arten' : 'Lebensräume'
          await client.mutate({
            mutation: exportTypeMutation,
            variables: { value },
          })
        }
      }
    },
    [exportTaxonomiesData, taxonomiesData],
  )

  const exportType = get(exportTypeData, 'exportType', null)

  return exportTypes.map(type => (
    <ErrorBoundary key={type}>
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
              {allTaxonomies.filter(t => {
                if (type === 'Arten') return t.type === 'ART'
                return t.type === 'LEBENSRAUM'
              }).length === 1
                ? 'Taxonomie:'
                : 'Taxonomien:'}
            </TaxTitle>
            <FormGroup>
              {allTaxonomies
                .filter(t => {
                  if (type === 'Arten') return t.type === 'ART'
                  return t.type === 'LEBENSRAUM'
                })
                .sort(t => t.name)
                .map(tax => (
                  <TaxonomyLabel
                    key={tax.name}
                    control={
                      <Checkbox
                        color="primary"
                        name={tax.name}
                        checked={exportTaxonomies.includes(tax.name)}
                        onChange={onCheckTaxonomy}
                      />
                    }
                    label={tax.name}
                  />
                ))}
            </FormGroup>
          </TaxContainer>
        )}
      </TypeContainer>
    </ErrorBoundary>
  ))
}

export default enhance(ExportTypes)
