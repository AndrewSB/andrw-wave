import React, { Component } from 'react';

const backgroundImageUrl = 'https://78.media.tumblr.com/3c9a8417a347d806520acc60267a3dac/tumblr_nkap4jjcuq1twprc3o1_1280.jpg'

const AnimationState = Object.freeze({
  notYet: 0,
  animating: 1,
  done: 2,
})

export default class extends Component {
  state = {
    animating: AnimationState.notYet,
    overlayAlpha: 0,
  }

  render() {
    console.log('rendering')
    return (
        <div style={styles.background}>
        <a style={styles.lost} onClick={this.handleClick.bind(this)}>u lost?</a>
        <p style={styles.name}>A N D R W</p>
        <div style={styles.whiteOverlay(this.state)} />
      </div>
    )
  }

  handleClick() {
    console.log(this.state)
    if (this.state.animating === AnimationState.animating) { return }

    this.setState({ animating: AnimationState.animating })
    this.animate()
  }

  // Callee is responsible for only calling this once
  animate() {
    const opacityJumps = [30, 40, 50, 60, 70, 80, 90, 100]
    var i = 0;
    var parentThis = this;
    const intervalHandle = setInterval(() => {
      console.log(parentThis.state)
      parentThis.setState({ overlayAlpha: opacityJumps[i] })
      i++;
      if (i === opacityJumps.length) {
        clearInterval(intervalHandle)
        parentThis.setState({ animating: AnimationState.done, overlayAlpha: 0 })
      }
    }, 250)

  }
}

const styles = {
  whiteOverlay: (state) => {
    console.log('called', state)

    // Ask Case how to store this state
    if (state.animating === 1) {
      console.log('lolyo')
      console.log(state.overlayAlpha / 100)
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        opacity: state.overlayAlpha / 100,
      }
    } else {
      console.log('fux')
      return { display: 'none' }
    }
  },
  background: {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lost: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10vh',
    color: '#DF976C',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '3vw',
  },
  name: {
    color: '#176EA8',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '8vw',
    marginLeft: '5vw',
    marginTop: '30vh',
  },
}
