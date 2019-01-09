// @flow
import React, { useState, useCallback } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'

import ChooseColumn from './ChooseColumn'
import PreviewColumn from './PreviewColumn'

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
  const [tab, setTab] = useState(0)

  const onChangeTab = useCallback((event, value) => setTab(value))
  const onChangeIndex = useCallback(i => setTab(i))

  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
  const dimensions = { width: windowWidth }

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
      <StyledSwipeableViews axis="x" index={tab} onChangeIndex={onChangeIndex}>
        <ChooseColumn dimensions={dimensions} />
        <PreviewColumn dimensions={dimensions} />
      </StyledSwipeableViews>
    </>
  )
}

export default ExportStacked
