import React from "react";

export default function TermsAndCondition() {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Terms and Conditions</h1>
      <p className="text-base text-gray-700 mb-4">
        Welcome to Expensio. By using our service, you agree to the following terms and conditions.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Service Use:</strong> You must use Expensio for lawful purposes only. You are responsible for the accuracy of the financial data you enter.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Razorpay Payments:</strong> All payments processed via Razorpay are subject to Razorpay's terms and policies. Expensio is not liable for payment gateway issues.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Data & Privacy:</strong> Please refer to our Privacy Policy for details on how your data is handled.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Changes:</strong> We may update these terms at any time. Continued use of Expensio means you accept any changes.
      </p>
    </div>
  );
}
