import React, { useCallback, useEffect, useState, useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SwipeableViews from 'react-swipeable-views'
import { observer } from 'mobx-react-lite'

import Layout from '../components/Layout'
import ErrorBoundary from '../components/shared/ErrorBoundary'
import Sidebar from '../templates/Sidebar'
import useLocation from '../modules/useLocation'
import mobxStoreContext from '../mobxStoreContext'

const Container = styled.div`
  height: calc(100vh - 64px);
  display: flex;
`
const Doku = styled.div`
  width: 100%;
  padding: 25px;
  ul {
    margin-top: 0;
  }
  p,
  li {
    margin-bottom: 0;
  }
  h1,
  h3,
  ol {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`
const StyledSwipeableViews = styled(SwipeableViews)`
  height: 100%;
  .react-swipeable-view-container {
    height: 100%;
  }
`

const Dokumentation = ({ data }) => {
  const { windowWidth } = useContext(mobxStoreContext)
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark
  const { pathname } = useLocation()
  const pathElements = pathname.split('/').filter((p) => !!p)

  const [tab, setTab] = useState(0)
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const [stacked, setStacked] = useState(false)
  useEffect(() => {
    const shouldBeStacked = windowWidth < 700
    setStacked(shouldBeStacked)
  }, [windowWidth])
  useEffect(() => {
    if (pathElements.length > 1 && tab === 0) setTab(1)
    if (pathElements.length === 1 && tab === 1) setTab(0)
  }, [pathElements, tab])

  if (stacked) {
    return (
      <ErrorBoundary>
        <Layout>
          <StyledPaper>
            <Tabs
              variant="fullWidth"
              value={tab}
              onChange={onChangeTab}
              indicatorColor="primary"
            >
              <Tab label="Navigation" />
              <Tab label="Formular" />
            </Tabs>
          </StyledPaper>
          <StyledSwipeableViews
            axis="x"
            index={tab}
            onChangeIndex={(i) => setTab(i)}
          >
            <Sidebar
              title="Dokumentation"
              titleLink="/Dokumentation/"
              edges={edges}
              stacked={true}
            />
            <Doku>
              <p>Hoffentlich nützliche Infos für Sie</p>
            </Doku>
          </StyledSwipeableViews>
        </Layout>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <Sidebar
            title="Dokumentation"
            titleLink="/Dokumentation/"
            edges={edges}
          />
          <Doku>
            <p>Hoffentlich nützliche Infos für Sie</p>
          </Doku>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort1] }
      filter: { fileAbsolutePath: { regex: "/(/docs)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            path
          }
        }
      }
    }
  }
`

export default observer(Dokumentation)
