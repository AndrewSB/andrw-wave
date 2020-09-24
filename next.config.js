const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/newmac',
        destination: 'https://raw.githubusercontent.com/AndrewSB/dotfiles/master/scripts/new-mac.sh',
        permanent: true,
      },
    ]
  },
}

module.exports = withPlugins([
  [optimizedImages, {
    /* config for next-optimized-images */
  }],


  // your other plugins here

], nextConfig);
