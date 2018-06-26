// @flow
import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import SwipeableViews from 'react-swipeable-views'
import get from 'lodash/get'

import Tree from '../Tree'
import DataType from '../DataType'
import activeNodeArrayData from '../../modules/activeNodeArrayData'

const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`
const StyledSwipeableViews = styled(SwipeableViews)`
  height: 100%;
  .react-swipeable-view-container {
    height: 100%;
  }
`

const enhance = compose(
  activeNodeArrayData,
  withState('tab', 'setTab', 0),
  withHandlers({
    onChangeTab: ({ setTab }) => (event, value) => {
      setTab(value)
    },
  })
)

const DataStacked = ({
  tab,
  setTab,
  onChangeTab,
  activeNodeArrayData,
}: {
  tab: Number,
  setTab: () => void,
  onChangeTab: () => void,
  activeNodeArrayData: Object,
}) => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const disableDataType = activeNodeArray.length < 2

  return (
    <Fragment>
      <StyledPaper>
        <Tabs
          centered
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
        <Tree dimensions={{ width: windowWidth }} />
        <DataType stacked={true} dimensions={{ width: windowWidth }} />
      </StyledSwipeableViews>
    </Fragment>
  )
}

export default enhance(DataStacked)
