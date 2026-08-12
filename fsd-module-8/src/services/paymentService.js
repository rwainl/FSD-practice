/**
 * Payment Service (STARTER)
 * TODO: Integrate dengan Midtrans payment gateway
 * 
 * Learning objectives:
 * - Call backend API untuk create payment
 * - Load Midtrans Snap.js script
 * - Open Snap payment popup
 */

import apiClient from './api';

// TODO 1: Implement createPayment function
export const createPayment = async (orderData) => {
  // TODO: Send POST request to /api/external/payment/create
  // TODO: Validate response has paymentUrl
  // TODO: Return payment data
  // TODO: Handle errors
  
  // HINT: try {
  // HINT:   const response = await apiClient.post('/api/external/payment/create', orderData);
  // HINT:   if (response.data.success && response.data.data.paymentUrl) {
  // HINT:     return response.data.data;
  // HINT:   }
  // HINT:   throw new Error('Invalid payment response');
  // HINT: } catch (error) {
  // HINT:   throw new Error(error.message || 'Payment creation failed');
  // HINT: }
};

// TODO 2: Implement loadSnapScript function
export const loadSnapScript = () => {
  // TODO: Return Promise
  // TODO: Check if Snap.js already loaded (window.snap)
  // TODO: If yes, resolve immediately
  // TODO: If no, create script element
  // TODO: Set src to Midtrans Snap.js URL (sandbox)
  // TODO: Get client key from environment
  // TODO: Set data-client-key attribute
  // TODO: Append to document body
  // TODO: Handle load/error events
  
  // HINT: return new Promise((resolve, reject) => {
  // HINT:   if (window.snap) {
  // HINT:     resolve(window.snap);
  // HINT:     return;
  // HINT:   }
  // HINT:   
  // HINT:   const script = document.createElement('script');
  // HINT:   script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
  // HINT:   script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
  // HINT:   script.onload = () => resolve(window.snap);
  // HINT:   script.onerror = () => reject(new Error('Failed to load Snap.js'));
  // HINT:   document.body.appendChild(script);
  // HINT: });
};

// TODO 3: Implement openSnapPayment function
export const openSnapPayment = (snapToken, onSuccess, onPending, onError) => {
  // TODO: Check if window.snap exists
  // TODO: If not, call onError
  // TODO: If yes, call window.snap.pay dengan token
  // TODO: Handle onSuccess, onPending, onError, onClose callbacks
  
  // HINT: if (!window.snap) {
  // HINT:   if (onError) onError(new Error('Snap.js not loaded'));
  // HINT:   return;
  // HINT: }
  // HINT: 
  // HINT: window.snap.pay(snapToken, {
  // HINT:   onSuccess: (result) => { if (onSuccess) onSuccess(result); },
  // HINT:   onPending: (result) => { if (onPending) onPending(result); },
  // HINT:   onError: (result) => { if (onError) onError(result); },
  // HINT:   onClose: () => { console.log('Payment popup closed'); }
  // HINT: });
};

// ==========================================
// USAGE EXAMPLE
// ==========================================

/*
// In CheckoutPage.jsx:

import { createPayment, loadSnapScript, openSnapPayment } from '../services/paymentService';

function CheckoutPage() {
  useEffect(() => {
    // Load Snap.js on component mount
    loadSnapScript().catch(console.error);
  }, []);

  const handleCheckout = async () => {
    try {
      // Create payment
      const orderData = {
        orderId: `ORDER-${Date.now()}`,
        amount: getCartTotal(),
        items: cart,
        customerDetails: {
          firstName: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      };

      const paymentData = await createPayment(orderData);

      // Open Snap payment popup
      openSnapPayment(
        paymentData.token,
        (result) => {
          // Payment success!
          navigate('/order-success');
        },
        (result) => {
          // Payment pending
          message.warning('Payment pending');
        },
        (error) => {
          // Payment error
          message.error('Payment failed');
        }
      );
    } catch (error) {
      message.error(error.message);
    }
  };
}

MIDTRANS TEST CARDS (Sandbox):

Card Number: 4811 1111 1111 1114
CVV: 123
Exp: 01/25

NEXT STEPS:
1. Complete TODOs 1-3
2. Add loadSnapScript in CheckoutPage useEffect
3. Call createPayment on checkout submit
4. Open Snap popup dengan returned token
5. Test payment flow dengan test card
6. Compare dengan finished-project
*/

