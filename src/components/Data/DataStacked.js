// @flow
import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import Tree from '../Tree'
import DataType from '../DataType'

const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`
const StyledTabs = styled(Tabs)`
  .indicator {
    height: 3px;
  }
`

const enhance = compose(
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
}: {
  tab: Number,
  setTab: () => void,
  onChangeTab: () => void,
}) => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth

  return (
    <Fragment>
      <StyledPaper>
        <StyledTabs
          centered
          value={tab}
          onChange={onChangeTab}
          indicatorColor="#E65100"
          indicatorClassName="indicator"
        >
          <Tab label="Strukturbaum" />
          <Tab label="Formular" />
        </StyledTabs>
      </StyledPaper>
      {tab === 0 && <Tree dimensions={{ width: windowWidth }} />}
      {tab === 1 && <DataType dimensions={{ width: windowWidth }} />}
    </Fragment>
  )
}

export default enhance(DataStacked)
