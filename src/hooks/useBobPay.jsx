/* eslint-disable semi */
import { useCallback, useEffect } from 'react';

const useBobPay = () => {
  const errorCallback = useCallback((error) => {
    window.ReactNativeWebView.postMessage('error check details!');
    console.log(error);
  }, []);

  window.cancelCallback = useCallback((error) => {
    console.log('cancel');
    window.ReactNativeWebView.postMessage('canceled by user!');
  }, []);

  window.CompleteResults = useCallback((response) => {
    console.log('CompleteResults');
    console.log('successIndicator: ' + JSON.stringify(response));
    window.ReactNativeWebView.postMessage('Completed!');
  }, []);

  useEffect(() => {
    const loadScript = async () => {
      if (!document) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 5000);

        const prevScript = document.getElementById('checkout-js');

        if (prevScript) {
          prevScript.remove();
        }
        const script = document.createElement('script');
        script.src =
          'https://test-bobsal.gateway.mastercard.com/checkout/version/61/checkout.js';
        script.onerror = reject;
        script.id = 'checkout-js';
        script.setAttribute('data-cancel', 'cancelCallback');
        script.setAttribute('data-complete', 'CompleteResults');
        script.setAttribute('data-complete-msg', 'postMessage');
        script.onload = () => resolve();

        document.body.appendChild(script);
      });
    };
    loadScript();

    return () => {
      const prevScript = document.getElementById('checkout-js');
      if (prevScript) {
        prevScript.remove();
      }
    };
  }, [errorCallback]);

  const createCheckout = useCallback((ID) => {
    const { Checkout } = window;

    if (!Checkout) {
      return;
    }

    Checkout.configure({
      merchant: 'TESTBBROKER',
      session: {
        id: ID,
      },
      interaction: {
        locale: 'en_US',
        merchant: {
          name: 'TESTBBROKER',
          address: {
            line1: '200 Sample St',
            line2: '1234 Example Town',
          },
        },
      },
    });

    Checkout.showLightbox();
    // Checkout.showPaymentPage();
  }, []);

  return { createCheckout };
};

export default useBobPay;
