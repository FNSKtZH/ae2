// @flow
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import AppBar from './AppBar'
import TreeColumn from './TreeColumn'
import Taxonomie from './Taxonomie'
import EigenschaftenSammlung from './EigenschaftenSammlung'
import BeziehungsSammlung from './BeziehungsSammlung'
import Exporte from './Exporte'
import FourOhFour from './FourOhFour'

import '../index.css'

class App extends Component {
  componentWillMount() {
    const { location, history } = this.props
    if (location.pathname === '/') {
      history.push('/Taxonomien')
    }
  }

  render() {
    return (
      <div>
        <AppBar />
        <TreeColumn />
        <Switch>
          <Route path="/Taxonomien" component={Taxonomie} />
          <Route
            path="/Eigenschaften-Sammlungen"
            component={EigenschaftenSammlung}
          />
          <Route path="/Beziehungs-Sammlungen" component={BeziehungsSammlung} />
          <Route path="/Exporte" component={Exporte} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
