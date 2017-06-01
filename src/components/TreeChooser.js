// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Level0 from './TreeLevel0'
import TaxonomyLevel1 from './TreeTaxonomyLevel1'
import TaxonomyLevel2 from './TreeTaxonomyLevel2'
import TaxonomyLevel3 from './TreeTaxonomyLevel3'
import TaxonomyLevel4 from './TreeTaxonomyLevel4'
import TaxonomyLevel5 from './TreeTaxonomyLevel5'
import TaxonomyLevel6 from './TreeTaxonomyLevel6'
import TaxonomyLevel7 from './TreeTaxonomyLevel7'

const enhance = compose(inject('store'), observer)

const TreeCategories = ({ store }: { store: Object }) => {
  const { activeNodeArray } = store

  switch (activeNodeArray[0]) {
    case undefined:
      return <Level0 />
    case 'taxonomy': {
      switch (activeNodeArray.length) {
        case 1:
          return <TaxonomyLevel1 />
        case 2:
          return <TaxonomyLevel2 />
        case 3:
          return <TaxonomyLevel3 />
        case 4:
          return <TaxonomyLevel4 />
        case 5:
          return <TaxonomyLevel5 />
        case 6:
          return <TaxonomyLevel6 />
        case 7:
          return <TaxonomyLevel7 />
        /*case 8:
          return taxonomyLevel8
        case 9:
          return taxonomyLevel9
        case 10:
          return taxonomyLevel10*/
        default:
          return <Level0 />
      }
    }
    case 'property_collection':
    case 'relation_collection':
    case 'export':
    default:
      return <Level0 />
  }
}

export default enhance(TreeCategories)
