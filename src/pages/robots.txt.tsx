import type { GetServerSideProps } from "next";
import { siteMetadata } from "../siteMetadata";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Allow: /

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
`);
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}
