import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { observer } from 'mobx-react-lite'

import Taxonomies from './Taxonomies'
import mobxStoreContext from '../../../../../../mobxStoreContext'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

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

const ExportTypes = ({ type, taxonomies }) => {
  const mobxStore = useContext(mobxStoreContext)
  const {
    type: exportType,
    setType: setExportType,
    setTaxonomies,
  } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const onCheckType = useCallback(
    async (event, isChecked) => {
      const { name } = event.target
      if (isChecked) {
        setExportType(name)
        // check if only one Taxonomy exists
        // if so, check it
        if (taxonomies.length === 1) {
          const taxonomyName = taxonomies[0]?.taxonomyName
          setTaxonomies([...exportTaxonomies, taxonomyName])
        }
        // check if taxonomy(s) of other type was choosen
        // if so: uncheck
        const exportTaxonomiesWithoutOtherType = exportTaxonomies.filter(
          (t) => exportTypeTAXToReadable[t.type] === name,
        )
        if (exportTaxonomiesWithoutOtherType.length < exportTaxonomies.length) {
          setTaxonomies(exportTaxonomiesWithoutOtherType)
        }
      } else {
        setExportType(exportTypes.find((t) => t !== name))
        // uncheck all taxonomies of this type
        const taxonomiesToUncheck = taxonomies.map((t) => t.taxonomyName)
        const remainingTaxonomies = exportTaxonomies.filter(
          (t) => !taxonomiesToUncheck.includes(t),
        )
        setTaxonomies(remainingTaxonomies)
      }
    },
    [setExportType, taxonomies, exportTaxonomies, setTaxonomies],
  )

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

export default observer(ExportTypes)
