// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

import getActiveObjectIdFromNodeArray from '../../modules/getActiveObjectIdFromNodeArray'

export default graphql(
  gql`
    query ObjectQuery(
      $objectId: UUID!
      $existsObjectId: Boolean!
      $pCId: UUID!
      $existsPCId: Boolean!
      $taxId: UUID!
      $existsTaxId: Boolean!
    ) {
      objectById(id: $objectId) @include(if: $existsObjectId) {
        id
        name
      }
      propertyCollectionById(id: $pCId) @include(if: $existsPCId) {
        id
        name
      }
      taxonomyById(id: $taxId) @include(if: $existsTaxId) {
        id
        name
      }
    }
  `,
  {
    options: ({ activeNodeArrayData }) => {
      const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
      const objectId = getActiveObjectIdFromNodeArray(activeNodeArray)
      let pCId = '99999999-9999-9999-9999-999999999999'
      if (
        activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
        activeNodeArray[1]
      ) {
        pCId = activeNodeArray[1]
      }
      const existsPCId = pCId !== '99999999-9999-9999-9999-999999999999'
      let taxId = '99999999-9999-9999-9999-999999999999'
      if (
        ['Arten', 'Lebensräume'].includes(activeNodeArray[0]) &&
        activeNodeArray[1]
      ) {
        taxId = activeNodeArray[1]
      }
      const existsTaxId = taxId !== '99999999-9999-9999-9999-999999999999'

      return {
        variables: {
          objectId: objectId || '99999999-9999-9999-9999-999999999999',
          existsObjectId: !!objectId,
          pCId,
          existsPCId,
          taxId,
          existsTaxId,
        },
      }
    },
    name: 'appBarData',
  }
)
