import React, { Component } from 'react'

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
  
  // this is kind of a shit check, but media-queries dont work well in React and this seems to work
  isMobile = ['Mobile', 'iPhone', 'Android', 'Windows Phone']
    .some((candidateString) => navigator.userAgent.indexOf(candidateString) !== -1)
  
  render() {
    return (
        <div style={styles.background}>
          <div style={styles.lostContainer(this.isMobile)}>
            <a style={styles.lost} onClick={this.handleClick.bind(this)}>u lost?</a>
          </div>
          <div style={styles.nameContainer(this.isMobile)}>
            <p style={styles.name}>A N D R W</p>
          </div>
        <div style={styles.whiteOverlay(this.state)} />
      </div>
    )
  }

  handleClick() {
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
      parentThis.setState({ overlayAlpha: opacityJumps[i] })
      i++;
      if (i === opacityJumps.length) {
        clearInterval(intervalHandle)
        parentThis.setState({ animating: AnimationState.done, overlayAlpha: 0 })
        window.location.href = '/404'
      }
    }, 250)

  }
}

const styles = {
  whiteOverlay: (state) => {
    if (state.animating === 1) {
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
  lostContainer: (isMobile) => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '3vw',
      marginTop: isMobile ? '8.5vh' : '10vh',
    }
  },
  lost: {
    color: '#DF976C',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '4vw',
  },
  nameContainer: (isMobile) => {
    return {
      marginLeft: isMobile ? '4vw' : '5vw',
      marginTop: isMobile ? '25vh' : '31vh',
    }
  },
  name: {
    color: '#176EA8',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '8vw',
  },
}
