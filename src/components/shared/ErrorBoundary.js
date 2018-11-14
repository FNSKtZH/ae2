// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 10px;
`
const ErrorTitle = styled.div`
  margin-bottom: 10px;
`

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    // Catch errors in any components below and re-render with error message
    return {
      error,
    }
  }

  render() {
    const { error } = this.state
    if (error) {
      return (
        <Container>
          <ErrorTitle>
            Oh nein, es ist ein Fehler aufgetreten! Bericht:
          </ErrorTitle>
          {error.message}
          <div />
        </Container>
      )
    }
    const { children } = this.props
    var childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { ...this.props }),
    )

    // Normally, just render children
    // and pass all props
    return childrenWithProps
  }
}

export default ErrorBoundary
