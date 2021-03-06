import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import FakePhonePanel from './FakePhonePanel';
import PokemonDialogBox from './PokemonDialogBox';
import styles from './Me.module.css';

const backgroundImageUrl = 'http://svgshare.com/i/JtN.svg'
const oldBackgroundImageUrl = 'https://78.media.tumblr.com/3c9a8417a347d806520acc60267a3dac/tumblr_nkap4jjcuq1twprc3o1_1280.jpg'
const backgroundImageUrlPallete = {
  'dominant': 'rgb(40, 70, 80)',
};

const Me: React.FC = () => {
  return (
    <FakePhonePanel showingWidth={530} customStyle={`
      background: ${backgroundImageUrlPallete.dominant};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    `}>
      <div className={styles.background}>
        <Link href='/404'>
          <a className='fourohfourlink'> </a>
        </Link>
        <PokemonDialogBox
          pushLostPage={() => Router.push('/404')}
          onNewText={(newText) => {
            // @ts-ignore
            if (window.analytics !== undefined) {
              // @ts-ignore
              window.analytics.track('Tapped text', {
                textval: newText
              })
            }
          }}
          styles={`
            position: absolute;
            bottom: 22px;
            right: 22px;
          `} />
      </div>
      <style jsx>{`
        .fourohfourlink {
          display: block;
          padding-top: 8.5vh;
          height: 88px;
          width: 200px;
        }

        p {
          font-family: Arial, sans-serif;
        }
      `}</style>
    </FakePhonePanel>
  );
}

export default Me;