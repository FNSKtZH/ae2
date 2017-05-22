// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Taxonomy from './Taxonomy'
import PropertyCollection from './PropertyCollection'
import RelationCollection from './RelationCollection'
import Exporte from './Exporte'
import FourOhFour from './FourOhFour'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Taxonomien" component={Taxonomy} />
        <Route
          path="/Eigenschaften-Sammlungen"
          component={PropertyCollection}
        />
        <Route path="/Beziehungs-Sammlungen" component={RelationCollection} />
        <Route path="/Exporte" component={Exporte} />
        <Route component={FourOhFour} />
      </Switch>
    )
  }
}

export default Main
