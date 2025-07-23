import React from "react";

const Shipping = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Shipping & Delivery Policy</h1>
      <p className="text-base text-gray-700 mb-4">
        Expensio is a digital product. As soon as your payment of <span className="font-semibold">₹199</span> is successful, you will receive instant access to all features.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">No Physical Shipping:</strong> There is no physical shipment. All services are delivered online immediately after payment confirmation.
      </p>
    </div>
  );
}

export default Shipping;