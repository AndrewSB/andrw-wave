import React from 'react';
import Me from '../components/Me';
import dynamic from 'next/dynamic';
import { AnalyticsHead } from './_app';

const Home = () => (
  <>
    <AnalyticsHead path='/'/>
    <Me />
  </>
);

export default Home;
