
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 bg-violet-100">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Privacy Policy</h1>
      <p className="text-base text-gray-700 mb-4">
        Your privacy is important to us. This policy explains how Expensio collects, uses, and protects your personal information.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Information Collection:</strong> We only collect information necessary to provide our expense tracking services, such as your name, email, and financial data you enter.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Use of Information:</strong> Your data is used solely to help you manage your finances and improve our services. We do not sell or share your information with third parties except as required by law.
      </p>
      <p className="text-base text-gray-700 mb-4">
        <strong className="font-semibold text-gray-800">Data Security:</strong> We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
