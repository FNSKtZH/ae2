// @flow

import gql from 'graphql-tag'

export default gql`
  query exportDataQuery(
    $existsLevel2Pc: Boolean!
    $notExistsLevel2Pc: Boolean!
    $existsLevel2Taxonomy: Boolean!
    $existsLevel3: Boolean!
    $level3Taxonomy: String!
    $existsLevel4: Boolean!
    $level4Taxonomy: UUID!
  ) {
    allPropertyCollections @include(if: $notExistsLevel2Pc) {
      totalCount
    }
  }
`
