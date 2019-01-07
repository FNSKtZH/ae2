// @flow
import React from 'react'
import compose from 'recompose/compose'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import withTaxonomiesData from '../withTaxonomiesData'
import ExportType from './ExportType'

const exportTypes = ['Arten', 'Lebensräume']

const enhance = compose(withTaxonomiesData)

const ExportTypes = ({ taxonomiesData }: { taxonomiesData: Object }) => {
  const allTaxonomies = sortBy(
    get(taxonomiesData, 'allTaxonomies.nodes', []),
    'name',
  )

  return exportTypes.map(type => {
    const taxonomies = allTaxonomies
      .filter(t => {
        if (type === 'Arten') return t.type === 'ART'
        return t.type === 'LEBENSRAUM'
      })
      .sort(t => t.name)

    return <ExportType key={type} type={type} taxonomies={taxonomies} />
  })
}

export default enhance(ExportTypes)
