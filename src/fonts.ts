import { Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";

export const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-press-start-2p",
});

export const msBeeRegular = localFont({
  src: "../public/fonts/MSBee-Regular.woff2",
  display: "swap",
  variable: "--font-msbee-regular",
});

export const msBeeBold = localFont({
  src: "../public/fonts/MSBee-Bold.woff2",
  display: "swap",
  variable: "--font-msbee-bold",
});
