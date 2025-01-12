import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('your-publishable-key-here');

// Create the Checkout Form Component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block font-semibold text-sm">Card Holder's Name</label>
        <input
          type="text"
          className="border border-[#9F9F9F] w-full p-2 rounded-md"
          placeholder="Bessie Cooper"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-sm">Card Number</label>
        <CardElement className="p-2 border rounded-md border-[#9F9F9F]" />
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 mr-2">
          <label className="block font-semibold text-sm">Expire Date</label>
          <input
            type="text"
            className="border w-full p-2 rounded-md border-[#9F9F9F]"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block font-semibold text-sm">CVC</label>
          <input
            type="text"
            className="border w-full p-2 rounded-md border-[#9F9F9F]"
            placeholder="CVC"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-4 p-2 bg-yellow text-white rounded-md"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

const PaymentStripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentStripe;
