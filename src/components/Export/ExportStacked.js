import React, { useState, useCallback, useContext } from 'react'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import { observer } from 'mobx-react-lite'

import ChooseColumn from './ChooseColumn'
import PreviewColumn from './PreviewColumn'
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

const ExportStacked = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { windowWidth } = mobxStore
  const [tab, setTab] = useState(0)

  const onChangeTab = useCallback((event, value) => {
    setTab(value)
  }, [])

  return (
    <>
      <StyledPaper>
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={onChangeTab}
          indicatorColor="primary"
        >
          <Tab label="Auswählen" />
          <Tab label="Vorschau" />
        </Tabs>
      </StyledPaper>
      <StyledSwipeableViews
        axis="x"
        index={tab}
        onChangeIndex={(i) => setTab(i)}
      >
        <ChooseColumn dimensions={{ width: windowWidth }} />
        <PreviewColumn dimensions={{ width: windowWidth }} />
      </StyledSwipeableViews>
    </>
  )
}

export default observer(ExportStacked)
