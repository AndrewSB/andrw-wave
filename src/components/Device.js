import React, { Component } from 'react'
import ReactWindowSized from 'react-window-size'
import Main from './Main.js'

class Device extends Component {
  render() {
    switch (true) { // o_o "pattern matching", they call this. Javascript 😢
    case (this.props.windowWidth > 575):
      const centerTextStyle = {display: 'flex', justifyContent: 'center', textAlign: 'center'}
      return (
        <div>
          <p style={centerTextStyle}>
	          your screen is too wide
          </p>
          <p style={centerTextStyle}>
	          make your screen narrower and the page will render -- this is a work in progress
          </p>
          <div style={{height: '60vh'}} />
          <h4 style={centerTextStyle}>
            WARNING: this is just a fun art project - not the portfolio you might expect
          </h4>
          <div style={{marginLeft: '5%', marginRight: '5%', lineHeight: '135%', marginBottom: '2vh'}}>
            <p style={Object.assign({}, centerTextStyle, {margin: '0'})}>
              i purposefully have a minor online presence.  if you're here for some professional reason, go look at my [github](https://github.com/AndrewSB) or my scant-on-details [linkedin](https://linkedin.com/in/ndrww). 
            </p>
            <p style={Object.assign({}, centerTextStyle, {margin: '0'})}>
              but, if you have something interesting to say, i'd recommend just emailing me: asbreckenridge [at] me.com. i love receiving interesting emails.
            </p>
          </div>
        </div>
      )
      // TODO: why does this look fine on the iPhone but not on macOS at this height? 715 breaks on desktop
      // case (this.props.windowHeight < 715):
      //   return <p style={{display: 'flex', justifyContent: 'center'}}>screen too short</p>
      default:
        return <Main />
    }
  }
}

export default ReactWindowSized(Device)
