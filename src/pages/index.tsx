import React from 'react';
import Me from '../components/Me';
import { AnalyticsHead } from './_app';

export default function Home() {
  return (
    <>
      <AnalyticsHead path='/' />
      <Me />
    </>
  )
}

