
import React from "react";
import axiosInstance from '../utils/axiosInstance';
import API_PATHS from '../utils/ApiPaths';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentModal = ({ onPay, onClose }) => {
  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }
    try {
      // Create order from backend
      const orderRes = await axiosInstance.post(API_PATHS.PAYMENT.CREATE_ORDER);
      const order = orderRes.data.order;
      const userId = localStorage.getItem('userId'); // Or get from context

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Expensio',
        description: 'One-time payment for Expensio',
        order_id: order.id,
        handler: async function (response) {
          // Update payment status in backend
          await axiosInstance.post(API_PATHS.PAYMENT.UPDATE_PAYMENT_STATUS, { userId });
          if (onPay) onPay();
        },
        prefill: {
          email: localStorage.getItem('email') || '',
        },
        theme: {
          color: '#7c3aed',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment initiation failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Complete Your Payment</h2>
        <p className="text-gray-700 mb-6">To unlock all features, please complete the one-time payment of <span className="font-semibold">₹199</span>.</p>
        <div className="mb-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unlock these features:</h3>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>Heatmap of your transactions</li>
            <li>Real-time financial analysis</li>
            <li>Interactive line charts</li>
            <li>Pie charts for category breakdown</li>
            <li>Recent transactions overview</li>
            <li>Income and expense tracking</li>
            <li>Downloadable reports</li>
            <li>Profile photo and personalization</li>
            <li>Secure data storage</li>
          </ul>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg mb-2"
          onClick={handleRazorpay}
        >
          Pay with Razorpay
        </button>
        <br />
        <button
          className="text-gray-500 hover:text-gray-700 text-sm mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
