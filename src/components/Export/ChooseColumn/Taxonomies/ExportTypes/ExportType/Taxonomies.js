// @flow
import React, { useCallback } from 'react'
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import get from 'lodash/get'

import exportTypeMutation from '../../../../exportTypeMutation'
import exportTaxonomiesMutation from '../../../../exportTaxonomiesMutation'
import withExportTaxonomiesData from '../../../../withExportTaxonomiesData'

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
  withExportTaxonomiesData,
)

const Taxonomies = ({
  exportTaxonomiesData,
  client,
  taxonomies,
}: {
  exportTaxonomiesData: Object,
  client: Object,
  taxonomies: Array<Object>,
}) => {
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])

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
        const thisTaxonomy = taxonomies.find(t => t.name === name)
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
    [exportTaxonomies, taxonomies],
  )

  return taxonomies.map(tax => (
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
  ))
}

export default enhance(Taxonomies)
