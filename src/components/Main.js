// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Taxonomie from './Taxonomie'
import EigenschaftenSammlung from './EigenschaftenSammlung'
import BeziehungsSammlung from './BeziehungsSammlung'
import Exporte from './Exporte'
import FourOhFour from './FourOhFour'
import '../index.css'

class Main extends Component {
  render() {
    return (
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
    )
  }
}

export default Main
