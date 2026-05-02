import type { GetServerSideProps } from "next";
import { siteMetadata } from "../siteMetadata";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/manifest+json");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(
    JSON.stringify({
      name: siteMetadata.appName,
      short_name: siteMetadata.shortName,
      description: siteMetadata.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: siteMetadata.backgroundColor,
      theme_color: siteMetadata.themeColor,
    })
  );
  res.end();

  return { props: {} };
};

export default function Manifest() {
  return null;
}
