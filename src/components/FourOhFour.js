import React, { Component } from 'react';

const backgroundImageUrl = 'http://78.media.tumblr.com/081bf739ed5bacf9268c6951c67cc13b/tumblr_np01gl81Mb1qbzzgco1_r1_540.png'
const okHandImageUrl = 'https://78.media.tumblr.com/c0f430296f0ec59343bb11e6e2a38a25/tumblr_o1q0o5T23V1uf5j8co1_250.gif'

export default class extends Component {
  render() {
    return (
      <div style={styles.background}>
        <div style={styles.title}>
          <p style={styles.ps}>4</p>
          <img alt='' src={okHandImageUrl} />
          <p style={styles.ps}>4</p>
        </div>
      </div>
    )
  }
}

const styles = {
    background: {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        overflow: 'hidden',
        // I want the top of the mountains in the image to align with an offset
        // of greater than 20px from the spinning hand. Maybe I should mess with
        // the calc function, or more probably dynamically generate the
        // percentage instead of hard coding it to 60%
        backgroundPosition: 'calc(50%) 60%', // https://stackoverflow.com/a/12852312
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ps: {
      fontSize: 66,
      color: '#E2019B',
      fontFamily: 'Andale Mono, AndaleMono, monospace',
    }
}
