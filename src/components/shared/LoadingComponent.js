// @flow
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
`

const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <Container>Lade...</Container>
  } else if (error) {
    //throw error
    return (
      <Container>
        {`Entschuldigung, die Seite konnte nicht geladen werden. Fehler: ${error.message}`}
      </Container>
    )
  } else {
    return null
  }
}

export default LoadingComponent
