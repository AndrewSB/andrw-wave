const withPlugins = require('next-compose-plugins');

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
  // your other plugins here
], nextConfig);
