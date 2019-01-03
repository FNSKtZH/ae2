// @flow
import React, { useState, useCallback } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import compose from 'recompose/compose'
import SwipeableViews from 'react-swipeable-views'
import get from 'lodash/get'

import Tree from '../Tree'
import DataType from '../DataType'
import withActiveNodeArrayData from '../../modules/withActiveNodeArrayData'

const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`
const StyledSwipeableViews = styled(SwipeableViews)`
  height: 100%;
  .react-swipeable-view-container {
    height: 100%;
  }
`

const enhance = compose(withActiveNodeArrayData)

const DataStacked = ({
  activeNodeArrayData,
}: {
  activeNodeArrayData: Object,
}) => {
  const [tab, setTab] = useState(0)
  const onChangeTab = useCallback((event, value) => setTab(value))

  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
  const windowHeight = w.innerHeight || e.clientHeight || g.clientHeight
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
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
          <Tab label="Strukturbaum" />
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

export default enhance(DataStacked)
