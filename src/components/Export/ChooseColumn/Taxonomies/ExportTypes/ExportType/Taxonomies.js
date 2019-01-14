// @flow
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import get from 'lodash/get'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import exportTaxonomiesMutation from '../../../../exportTaxonomiesMutation'
import mobxStoreContext from '../../../../../../mobxStoreContext'

const TaxonomyLabel = styled(FormControlLabel)`
  height: 33px;
  min-height: 33px;
  margin-left: -20px !important;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const storeQuery = gql`
  query exportTaxonomiesQuery {
    exportTaxonomies @client
  }
`

const Taxonomies = ({ taxonomies }: { taxonomies: Array<Object> }) => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const { setType } = mobxStore.export

  const { data: storeData } = useQuery(storeQuery, { suspend: false })
  const exportTaxonomies = get(storeData, 'exportTaxonomies', [])

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
          setType(value)
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

export default observer(Taxonomies)
