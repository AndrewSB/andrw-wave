import type { GetServerSideProps } from "next";
import { siteMetadata } from "../siteMetadata";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteMetadata.siteUrl}/</loc>
  </url>
</urlset>
`);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
