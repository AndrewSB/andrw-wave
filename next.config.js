function getDocsOrigin(value) {
  if (!value) {
    return null;
  }

  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error("DOCS_ORIGIN must be a valid absolute URL");
  }

  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);

  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocalhost)) {
    throw new Error("DOCS_ORIGIN must use HTTPS (HTTP is allowed for localhost)");
  }

  if (
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("DOCS_ORIGIN must contain only an origin, without a path or credentials");
  }

  return url.origin;
}

const docsOrigin = getDocsOrigin(process.env.DOCS_ORIGIN);

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
  async rewrites() {
    if (!docsOrigin) {
      return [];
    }

    return [
      {
        source: "/docs/:path*",
        destination: `${docsOrigin}/docs/:path*`,
      },
    ];
  },
};
