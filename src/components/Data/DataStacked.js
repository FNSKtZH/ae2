import React, { useState, useCallback, useContext } from 'react'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
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
  /* the following height is needed for home to scroll */
  height: ${(props) => props['data-height']}px;
  .react-swipeable-view-container {
    height: 100%;
  }
`

const DataStacked = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { windowWidth, windowHeight } = mobxStore

  const [tab, setTab] = useState(0)
  const onChangeTab = useCallback((event, value) => setTab(value), [])
  // 2021.01.24: no more used, as Home is shown
  //const disableDataType = activeNodeArray.length < 2

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
          <Tab label="Formular" disabled={false} />
        </Tabs>
      </StyledPaper>
      <StyledSwipeableViews
        axis="x"
        index={tab}
        onChangeIndex={(i) => setTab(i)}
        disabled={false}
        data-height={windowHeight - 103}
      >
        <Tree dimensions={{ width: windowWidth, height: windowHeight - 103 }} />
        <DataType stacked={true} dimensions={{ width: windowWidth }} />
      </StyledSwipeableViews>
    </>
  )
}

export default observer(DataStacked)
