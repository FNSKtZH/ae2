// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Level0 from './TreeLevel1'
import TaxonomyLevel1 from './TreeLevel2Taxonomy'
import TaxonomyLevel2 from './TreeLevel3Taxonomy'
import TaxonomyLevel3 from './TreeLevel4Taxonomy'
import TaxonomyLevel4 from './TreeLevel5Taxonomy'
import TaxonomyLevel5 from './TreeLevel6Taxonomy'
import TaxonomyLevel6 from './TreeLevel7Taxonomy'
import TaxonomyLevel7 from './TreeLevel8Taxonomy'
import TaxonomyLevel8 from './TreeLevel9Taxonomy'
import TaxonomyLevel9 from './TreeLevel10Taxonomy'
import TaxonomyLevel10 from './TreeTaxonomyLevel10'

const enhance = compose(inject('store'), observer)

const TreeChooser = ({ store }: { store: Object }) => {
  const { activeNodeArray } = store

  switch (activeNodeArray[0]) {
    case undefined:
      return <Level0 />
    case 'Taxonomien': {
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
        case 8:
          return <TaxonomyLevel8 />
        case 9:
          return <TaxonomyLevel9 />
        case 10:
          return <TaxonomyLevel10 />
        default:
          return <Level0 />
      }
    }
    case 'Eigenschaften-Sammlungen':
    case 'Beziehungs-Sammlungen':
    case 'export':
    default:
      return <Level0 />
  }
}

export default enhance(TreeChooser)
