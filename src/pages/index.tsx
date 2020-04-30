import React from 'react';
import Me from '../components/Me';
import { AnalyticsHead } from './_app';

const Home = () => (
  <>
    <AnalyticsHead path='/'/>
    <Me />
  </>
);

export default Home;
