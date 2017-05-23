// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

const TreeColumn = ({ viewer }: { viewer: Object }) => {
  console.log('viewer:', viewer)
  return <div>TreeColumn</div>
}

// export default TreeColumn

export default createFragmentContainer(
  TreeColumn,
  graphql`
  fragment TreeColumn_viewer on AllCategories {
    name
  }
`,
)
