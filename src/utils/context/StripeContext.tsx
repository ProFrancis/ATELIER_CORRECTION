import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'; // Import des Elements
import { URL } from '../constants/url';

export const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await loadStripe('ysk_test_51Me2LcGR1cAgvEOsftUol3zVEX5q8uE3R58dFhnkoUggKuM1Fh2fdgCutgjXdOR1dlGdQJFplr1u7ao6aBDdaBAq00R6B8Sd2b');
        setStripe(stripeInstance);
      } catch (error) {
        console.error('Error initializing Stripe', error);
      }
    };

    initializeStripe();
  }, []);

  const createPaymentIntent = async (amount) => {
    try {      
      const response = await axios.post(URL.PAYMENT, { amount, return_url: 'http://localhost:5173' });
      console.log("RESPONSE => ", response);
      
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent', error);
    }
  };

  const createPaymentMethod = async (cardElement) => {
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method', error);
        return null;
      }
      console.log("PAYMENT METHOD => ", paymentMethod);
      
      return paymentMethod;
    } catch (error) {
      console.error('Error creating payment method', error);
    }
  };

  const confirmPayment = async (paymentIntentId, paymentMethodId) => {
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      if (error) {
        console.error('Error confirming payment', error);
        return null;
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment', error);
    }
  };

  return (
    <StripeContext.Provider value={{ createPaymentIntent, createPaymentMethod, confirmPayment }}>
      <Elements stripe={stripe}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};
