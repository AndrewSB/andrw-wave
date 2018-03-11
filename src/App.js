import React, { Component } from 'react'
import Device from './components/Device'

const Page = Object.freeze({
  me: 0,
  lost: 1,
})

class App extends Component {
  state = {
    currentPage: Page.me
  }

  constructor() {
    super()
    var weakThis = this
    window.setPage = (page: Page) => {
      weakThis.setState({ currentPage: page })
    }
  }

  render() {
    console.log(this.state.currentPage)
    return <Device currentPage={this.state.currentPage} />
  }
}

export default App;
