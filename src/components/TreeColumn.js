// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

const TreeColumn = () => {
  return <div>TreeColumn</div>
}

export default createFragmentContainer(
  TreeColumn,
  graphql`
  {
    allCategories {
      nodes {
        name
      }
    }
  }
`,
)
