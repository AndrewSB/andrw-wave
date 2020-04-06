import React, { Component } from 'react';
import Link from 'next/link';
import FakePhonePanel from './FakePhonePanel';

const backgroundImageUrl = 'https://78.media.tumblr.com/3c9a8417a347d806520acc60267a3dac/tumblr_nkap4jjcuq1twprc3o1_1280.jpg'
const backgroundImageUrlPallete = {
  'dominant': 'rgb(40, 70, 80)',
};
const backgroundImageSize = {
  width: 486,
  height: 721
};

const AnimationState = Object.freeze({
  notYet: 0,
  animating: 1,
  done: 2,
})

const Me: React.FC = () => {
  const state = {
    animating: AnimationState.notYet,
    overlayAlpha: 0,
  }
  
  // this is kind of a shit check, but media-queries dont work well in React and this seems to work
  const isMobile = false // ['Mobile', 'iPhone', 'Android', 'Windows Phone'].some((candidateString) => navigator.userAgent.indexOf(candidateString) !== -1)

  return (
    <FakePhonePanel minimmumHeight={700} showingWidth={530} customStyle={`
      background: ${backgroundImageUrlPallete.dominant};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `}>
      <div className='background'>
        <Link href='/404'>
          <a>u lost?</a>
        </Link>
        <p>A N D R W</p> 
      </div>
      <style jsx>{`
        .background {
          background-image: url(${backgroundImageUrl});
          background-size: cover;
          background-position: top center;
          width: 100%;
          height: 100%;
          text-align: center;
        }

        a {
          color: #DF976C;
          font-family: Andale Mono, AndaleMono, monospace;
          font-size: 18px;
          text-decoration: none;
          display: block;
          padding-top: ${isMobile ? '8.5vh' : '9.6vh'};
        }

        p {
          color: #176EA8;
          font-family: Andale Mono, AndaleMono, monospace;
          font-size: 4.2vh;

          text-align: left;
          margin-left: 15px;
          margin-top: 26vh;
        }

        @media screen and (max-width: 480px) {
          .background {
            
          }
        }
      `}</style>
    </FakePhonePanel>
  );
      // <>
      //   <div style={styles.lostContainer(this.isMobile)}>
      //     <a style={styles.lost} onClick={this.handleClick.bind(this)}>u lost?</a>
      //   </div>
      //   <div style={styles.nameContainer(this.isMobile)}>
      //     <p style={styles.name}>A N D R W</p>
      //   </div>
      //   <div style={styles.whiteOverlay(this.state)} />
      // </>

  // handleClick() {
  //   if (this.state.animating === AnimationState.animating) { return }

  //   this.setState({ animating: AnimationState.animating })
  //   this.animate()
  // }

  // // Callee is responsible for only calling this once
  // animate() {
  //   const opacityJumps = [30, 40, 50, 60, 70, 80, 90, 100]
  //   var i = 0;
  //   var parentThis = this;
  //   const intervalHandle = setInterval(() => {
  //     parentThis.setState({ overlayAlpha: opacityJumps[i] })
  //     i++;
  //     if (i === opacityJumps.length) {
  //       clearInterval(intervalHandle)
  //       parentThis.setState({ animating: AnimationState.done, overlayAlpha: 0 })
  //       window.location.href = '/404'
  //     }
  //   }, 250)

  // }
}

export default Me;

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
