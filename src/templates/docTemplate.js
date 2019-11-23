import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'

import Layout from '../components/Layout'
import Sidebar from './Sidebar'

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

const DocTemplate = ({ data }) => {
  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { edges } = allMarkdownRemark

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
            <h1>{frontmatter.title}</h1>
            <DokuDate>{frontmatter.date}</DokuDate>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Doku>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
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

export default DocTemplate
