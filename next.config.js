module.exports = {
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