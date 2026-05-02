module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/newmac",
        destination:
          "https://raw.githubusercontent.com/AndrewSB/dotfiles/master/script/new-mac.sh",
        permanent: true,
      },
      {
        source: "/lucid",
        destination: "http://i.imgur.com/hJmweFb.jpg",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "http://linkedin.com/in/ndrww",
        permanent: true,
      },
      {
        source: "/duress",
        destination: "/rescue",
        permanent: true,
      },
    ];
  },
};
