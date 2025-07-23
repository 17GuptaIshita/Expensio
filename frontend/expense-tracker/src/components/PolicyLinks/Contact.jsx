import React from "react";

export default function Contact() {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 ">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Contact Us</h1>
      <p className="text-base text-gray-700 mb-4 text-center">
        For any questions, support, or feedback regarding Expensio, please reach out to us:
      </p>
      <div className="text-base text-gray-700 mb-4 flex flex-col items-center">
        <span className="font-semibold">Email:</span> <a href="mailto:ishitagupta0458@email.com">ishitagupta0458@email.com</a>
        <span className="font-semibold mt-2">Phone:</span> <span>+91-9893446144</span>
      </div>
      <p className="text-base text-gray-700 text-center">
        We aim to respond within 24 hours.
      </p>
    </div>
  );
}
