import React, { useEffect, useCallback, useState, useContext } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SwipeableViews from 'react-swipeable-views'
import SimpleBar from 'simplebar-react'
import { withResizeDetector } from 'react-resize-detector'
import { observer } from 'mobx-react-lite'

import Layout from '../components/Layout'
import ErrorBoundary from '../components/shared/ErrorBoundary'
import Sidebar from './Sidebar'
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
  h4,
  ol {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
const DokuDate = styled.p`
  margin-bottom: 15px !important;
  color: grey;
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

const DocTemplate = ({ data, height }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { windowWidth } = mobxStore

  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { edges } = allMarkdownRemark

  const { pathname } = useLocation()
  const pathElements = pathname.split('/').filter((p) => !!p)

  const [tab, setTab] = useState(0)
  const onChangeTab = useCallback(
    (event, value) => {
      setTab(value)
      if (value === 0) {
        // eslint-disable-next-line no-unused-vars
        const [first, ...rest] = pathElements
        navigate(`${first}/`)
      }
    },
    [pathElements],
  )

  const [stacked, setStacked] = useState(false)
  useEffect(() => {
    const shouldBeStacked = windowWidth < 700
    setStacked(shouldBeStacked)
  }, [windowWidth])
  useEffect(() => {
    pathElements.length > 1 && tab === 0 && setTab(1)
    pathElements.length === 1 && tab === 1 && setTab(0)
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
            <SimpleBar
              style={{ maxHeight: height, height: '100%', width: '100%' }}
            >
              <Doku>
                <h1>{frontmatter.title}</h1>
                <DokuDate>{frontmatter.date}</DokuDate>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </Doku>
            </SimpleBar>
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
          <SimpleBar
            style={{ maxHeight: height, height: '100%', width: '100%' }}
          >
            <Doku>
              <h1>{frontmatter.title}</h1>
              <DokuDate>{frontmatter.date}</DokuDate>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </Doku>
          </SimpleBar>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        path
        title
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort1] }
      filter: { fileAbsolutePath: { regex: "/(/docs)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            path
            title
            sort1
          }
        }
      }
    }
  }
`

export default withResizeDetector(observer(DocTemplate))
