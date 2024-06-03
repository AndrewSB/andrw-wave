module.exports = {
  images: {
    domains: ["i.scdn.co"],
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
  async headers() {
    return [
      {
        source: "/fonts/MSBee-Bold.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/MSBee-Regular.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
