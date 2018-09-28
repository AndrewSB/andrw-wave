import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import FourOhFour from './FourOhFour.js'
import Me from './Me.js'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Me} />
          <Route path='/404' component={FourOhFour} />
        </Switch>
      </main>
    )
  }
}

export default Main
