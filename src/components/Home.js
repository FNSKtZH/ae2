import React, { useEffect, useContext } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import MaterialCard from '@material-ui/core/Card'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import { withResizeDetector } from 'react-resize-detector'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../mobxStoreContext'

const StyledSimpleBar = styled(SimpleBar)`
  max-height: 100%;
  height: 100%;
  .simplebar-content {
    /* without this image did not cover 100% on large screens */
    height: 100%;
  }
  .simplebar-scrollbar:before {
    background: rgba(0, 0, 0, 0.7) !important;
  }
`
const Container = styled.div`
  padding: ${(props) =>
    props['data-width'] > 1700
      ? '55px'
      : props['data-width'] > 1200
      ? '45px'
      : props['data-width'] > 800
      ? '35px'
      : '25px'};
  position: relative;
  min-height: 100%;
  color: black !important;
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props['data-width'] > 1700
      ? '1fr 1fr 1fr 1fr'
      : props['data-width'] > 1200
      ? '1fr 1fr 1fr'
      : props['data-width'] > 800
      ? '1fr 1fr'
      : '1fr'};
  gap: ${(props) =>
    props['data-width'] > 1700
      ? '65px'
      : props['data-width'] > 1200
      ? '50px'
      : props['data-width'] > 800
      ? '40px'
      : '30px'};
  p {
    margin-bottom: 10px !important;
  }
  p:last-of-type {
    margin-bottom: 0 !important;
    margin-top: 10px !important;
  }
`
const Card = styled(MaterialCard)`
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.55) !important;
  font-weight: 700;
  ul {
    margin-bottom: 0;
  }
  li:last-of-type {
    margin-bottom: 0;
  }
  li {
    font-weight: 500;
  }
`
const CardTitle = styled.h3`
  font-weight: 700;
`
const DokuLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  &:hover {
    text-decoration: underline;
  }
`

const bgImageStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
}

const Home = ({ data, width }) => {
  // trick to prevent with from being reset on routing
  const mobxStore = useContext(mobxStoreContext)
  const { homeWidth, setHomeWidth } = mobxStore
  useEffect(() => {
    if (width && width !== homeWidth) {
      setHomeWidth(width)
    }
  }, [homeWidth, setHomeWidth, width])

  return (
    <StaticQuery
      query={graphql`
        query homePageQuery {
          file(relativePath: { eq: "home.jpg" }) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={(data) => (
        <StyledSimpleBar>
          <Container data-width={homeWidth}>
            <Img
              fluid={data?.file?.childImageSharp?.fluid}
              style={bgImageStyle}
            />
            <CardContainer data-width={homeWidth}>
              <Card>
                <CardTitle>Informationen zu:</CardTitle>
                <CardTitle>Arten, Lebensräumen und ihren Taxonomien</CardTitle>
              </Card>
              <Card>
                <CardTitle>...nachschlagen</CardTitle>Informationen finden, auch
                von Synonymen aus anderen Taxonomien
              </Card>
              <Card>
                <CardTitle>...exportieren</CardTitle>Eigenschaften wählen, Arten
                filtern
              </Card>
              <Card>
                <CardTitle>...direkt einbinden</CardTitle>Daten direkt aus
                anderen Anwendungen abfragen
              </Card>
              <Card>
                <CardTitle>...importieren und ändern</CardTitle>Benutzer mit
                Konto können Eigenschaften importieren oder direkt bearbeiten
              </Card>
              <Card>
                <CardTitle>Mehr Info:</CardTitle>
                <DokuLink to="/Dokumentation/Projektbeschreibung">
                  in der Dokumentation
                </DokuLink>
              </Card>
            </CardContainer>
          </Container>
        </StyledSimpleBar>
      )}
    />
  )
}

export default withResizeDetector(observer(Home))
