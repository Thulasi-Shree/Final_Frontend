/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import React,{lazy, Suspense, useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Elements = lazy(() => import('@stripe/react-stripe-js').then(module => ({ default: module.Elements })));


const LazyLoader = ({children}) => {
    const [stripeApiKey, setStripeApiKey] = useState('');
    useEffect(() => {
      async function getStripeApiKey() {
        try {
          const { data } = await axios.get('/api/stripeapi');
          setStripeApiKey(data.stripeApiKey);
        } catch (error) {
          console.log(error)
        }
      } 
      getStripeApiKey();
    }, []);



  return (
    <div>
        <Suspense fallback={<div>Loading Stripe...</div>}>
        <Elements stripe={loadStripe(stripeApiKey)}>
        {children}
      </Elements>
        </Suspense>
    </div>
  )
}

export default LazyLoader