import React from "react";

export default function Cancellation() {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 ">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Cancellation Policy</h1>
      <p className="text-base text-gray-700 mb-4">
        Expensio is available for a one-time payment of <span className="font-semibold">₹199</span>.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">No Cancellation:</strong> Once the payment is made, there is no cancellation policy. All sales are final and non-refundable.
      </p>
      <p className="text-base text-gray-700">
        For any questions, please contact <span className="font-semibold">support@expensio.com</span>.
      </p>
    </div>
  );
}
