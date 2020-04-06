import React, { Component } from 'react';
import FakePhonePanel from '../components/FakePhonePanel';

const backgroundImageUrl = 'http://78.media.tumblr.com/081bf739ed5bacf9268c6951c67cc13b/tumblr_np01gl81Mb1qbzzgco1_r1_540.png'
const backgroundImageUrlPallete = {
  'dominant': 'rgb(194, 194, 219)',
  'lightPink': 'rgba(227, 182, 251, 0.9)',
  'darkPink': 'rgba(150, 124, 170)',
  'lightGrey': 'rgb(182, 201, 207)',
};
const okHandImageUrl = 'https://78.media.tumblr.com/c0f430296f0ec59343bb11e6e2a38a25/tumblr_o1q0o5T23V1uf5j8co1_250.gif'

const Custom404 = () => {
  return (
    <>
      <FakePhonePanel showingWidth={800} customStyle={`
        background: ${backgroundImageUrlPallete.lightPink};
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      `} >
        <div className='background' >
          <div className='title'>
            <p>4</p>
            <img src={okHandImageUrl} />
            <p>4</p>
          </div>
        </div>
      </FakePhonePanel>

      <style jsx>{`
        .background {
          background-image: url(${backgroundImageUrl});
          background-size: cover;
          overflow: hidden;
          background-repeat: no-repeat;

          width: 100%;
          height: 100%;

          background-position: calc(50%) 80%;
        }

        .title {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        p {
          font-size: 66px;
          font-family: Andale Mono, AndaleMono, monospace;
          color: #E2019B;   
        }
      `}</style>
    </>
  )
};

export default Custom404;

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
