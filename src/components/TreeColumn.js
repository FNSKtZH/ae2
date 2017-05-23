// @flow
import React from 'react'
// import { createFragmentContainer, graphql } from 'react-relay'
// import { createContainer, QL } from 'react-relay'

const TreeColumn = (/*{ viewer }: { viewer: Object }*/) => {
  // console.log('viewer:', viewer)
  return <div>TreeColumn</div>
}

export default TreeColumn
/*
export default createContainer(TreeColumn, {
  fragments: {
    viewer: () => QL`
      fragment on Category {
        name
      }
    `,
  },
})*/
/*
export default createFragmentContainer(
  TreeColumn,
  graphql`
    fragment TreeColumn_viewer on Category {
      name
    }
  `
)*/
