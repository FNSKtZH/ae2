import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { observer } from 'mobx-react-lite'

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

const Taxonomies = ({ taxonomies }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { setType, setTaxonomies } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const onCheckTaxonomy = useCallback(
    async (event, isChecked) => {
      const { name } = event.target
      let taxonomies
      if (isChecked) {
        taxonomies = [...exportTaxonomies, name]
        setTaxonomies(taxonomies)
      } else {
        taxonomies = exportTaxonomies.filter((c) => c !== name)
        setTaxonomies(taxonomies)
        if (taxonomies.length === 0) {
          // this was the only taxonomy in this type
          // it makes sense to also uncheck the type
          setType(null)
        }
      }
    },
    [exportTaxonomies, setTaxonomies, setType],
  )

  return taxonomies.map((tax) => (
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
