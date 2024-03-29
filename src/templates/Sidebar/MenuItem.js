import React, { useCallback, useContext } from 'react'
import { navigate } from 'gatsby'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { Location } from '@reach/router'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'

import storeContext from '../../mobxStoreContext'

const ListItem = styled(ListItemButton)`
  ${(props) => props.ischild1 === 'true' && 'padding-left: 35px !important;'}
`

const MenuItem = ({ node }) => {
  const { sidebarWidth, setSidebarWidth } = useContext(storeContext)
  const { path, sort2 } = node.frontmatter

  const onClickMenuItem = useCallback(() => {
    navigate(`${path}/`)
    sidebarWidth && setSidebarWidth(null)
  }, [path, setSidebarWidth, sidebarWidth])

  return (
    <Location>
      {({ location }) => {
        const pathname = location.pathname.split('/').filter((a) => !!a)
        const isParent1 = sort2 === 0
        const isChild1 = sort2 > 0
        const pathSplit = path.split('/').filter((a) => !!a)
        const isParentOpen = pathSplit[1] === pathname[1]
        const isChildClosed = isChild1 && pathSplit[1] !== pathname[1]
        let active = isEqual(pathname, pathSplit)

        if (isChildClosed) return null

        return (
          <>
            <ListItem onClick={onClickMenuItem} selected={active} divider>
              <ListItemText onClick={onClickMenuItem}>
                {node?.frontmatter?.title ?? '(Titel fehlt)'}
              </ListItemText>
              {isParent1 && isParentOpen && <FaChevronDown />}
              {isParent1 && !isParentOpen && <FaChevronRight />}
            </ListItem>
          </>
        )
      }}
    </Location>
  )
}

export default MenuItem
