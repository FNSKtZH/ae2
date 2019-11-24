import React, { useCallback, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import debounce from 'lodash/debounce'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'

import Layout from '../components/Layout'
import Sidebar from '../templates/Sidebar'

const Container = styled.div`
  height: calc(100vh - 64px);
  display: flex;
`
const Doku = styled.div`
  width: 100%;
  padding: 25px;
  overflow-y: auto;
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
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark

  const [tab, setTab] = useState(0)
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const [stacked, setStacked] = useState(false)
  const updateStacked = useCallback(() => {
    if (typeof window === 'undefined') return
    const w = window
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
    const shouldBeStacked = windowWidth < 650
    setStacked(shouldBeStacked)
  }, [])

  useEffect(() => {
    updateStacked()
  }, [updateStacked])

  useEffect(() => {
    typeof window !== 'undefined' &&
      window.addEventListener('resize', debounce(updateStacked, 100))
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('resize', updateStacked)
    }
  }, [updateStacked])

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
              <Tab label="Formular" disabled={disableDataType} />
            </Tabs>
          </StyledPaper>
          <StyledSwipeableViews
            axis="x"
            index={tab}
            onChangeIndex={i => setTab(i)}
            disabled={disableDataType}
          >
            <Tree
              dimensions={{ width: windowWidth, height: windowHeight - 103 }}
            />
            <DataType stacked={true} dimensions={{ width: windowWidth }} />
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

export default Dokumentation
