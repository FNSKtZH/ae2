// @flow
import React from 'react'

const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Lade...</div>
  } else if (error) {
    return <div>Entschuldigung, die Seite konnte nicht geladen werden.</div>
  } else {
    return null
  }
}

export default LoadingComponent
