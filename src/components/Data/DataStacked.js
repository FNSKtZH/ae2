import React, { useState, useCallback, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import { observer } from 'mobx-react-lite'

import Tree from '../Tree'
import DataType from '../DataType'
import mobxStoreContext from '../../mobxStoreContext'

const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`
const StyledSwipeableViews = styled(SwipeableViews)`
  height: 100%;
  .react-swipeable-view-container {
    height: 100%;
  }
`

const DataStacked = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { activeNodeArray } = mobxStore

  const [tab, setTab] = useState(0)
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const w = typeof window !== 'undefined' ? window : {}
  const d = typeof window !== 'undefined' ? document : {}
  const e = typeof window !== 'undefined' ? d.documentElement : {}
  const g = d.getElementsByTagName('body')[0]
  const windowWidth =
    typeof window !== 'undefined'
      ? w.innerWidth || e.clientWidth || g.clientWidth
      : 500
  const windowHeight =
    typeof window !== 'undefined'
      ? w.innerHeight || e.clientHeight || g.clientHeight
      : 500
  const disableDataType = activeNodeArray.length < 2

  return (
    <>
      <StyledPaper>
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={onChangeTab}
          indicatorColor="primary"
        >
          <Tab label="Navigation" />
          <Tab label="Formular" disabled={disableDataType} />
        </Tabs>
      </StyledPaper>
      <StyledSwipeableViews
        axis="x"
        index={tab}
        onChangeIndex={i => setTab(i)}
        disabled={disableDataType}
      >
        <Tree dimensions={{ width: windowWidth, height: windowHeight - 103 }} />
        <DataType stacked={true} dimensions={{ width: windowWidth }} />
      </StyledSwipeableViews>
    </>
  )
}

export default observer(DataStacked)
