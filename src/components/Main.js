// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Taxonomy from './Taxonomy'
import PropertyCollection from './PropertyCollection'
import RelationCollection from './RelationCollection'
import Exporte from './Exporte'
import FourOhFour from './FourOhFour'

const enhance = compose(inject('store'), observer)

const Main = ({ store }: { store: Object }) => {
  const primaryUrl = store.activeNodeArray[0]
  const show404 = ![
    'taxonomy',
    'property_collection',
    'relation_collection',
    'export',
  ].includes(primaryUrl)
  return (
    <div>
      {primaryUrl === 'taxonomy' && <Taxonomy />}
      {primaryUrl === 'property_collection' && <PropertyCollection />}
      {primaryUrl === 'relation_collection' && <RelationCollection />}
      {primaryUrl === 'export' && <Exporte />}
      {show404 && <FourOhFour />}
    </div>
  )
}

export default enhance(Main)
