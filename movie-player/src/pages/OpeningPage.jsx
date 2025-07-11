import React from 'react'
import Header from '../components/Header'
import Trailer from '../components/Trailer'
import PricingButtons from '../components/PricingButtons';

function openingPage() {
  return (
    <div className='bg-black text-white'>
      <Header />
      <Trailer />
      <PricingButtons /> 
    </div>
  );
}

export default openingPage;