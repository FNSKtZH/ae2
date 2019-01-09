// @flow
import React from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import PCO from './PCO'

const PCOs = ({
  pCOs,
  relations,
  stacked,
}: {
  pCOs: Array<Object>,
  relations: Array<Object>,
  stacked: Boolean,
}) =>
  sortBy(pCOs, pCO =>
    get(pCO, 'propertyCollectionByPropertyCollectionId.name', '(Name fehlt)'),
  ).map(pCO => (
    <PCO
      key={pCO.propertyCollectionId}
      pCO={pCO}
      relations={relations.filter(
        r => r.propertyCollectionId === pCO.propertyCollectionId,
      )}
      stacked={stacked}
    />
  ))

export default PCOs
