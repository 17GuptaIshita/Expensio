import React from 'react';
import { Link } from 'react-router-dom';
import dashboardImg from '../assets/imagess/dashboardImg.jpeg';
import { LuTrendingUpDown, LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';

const LandingPage = () => {

  return (
    <div className='bg-violet-50'>
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-violet-50">
      <div className="w-full md:w-1/2 flex flex-col items-start px-8 md:px-20 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Welcome to Expensio</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          Track your income and expenses efficiently and effectively. Visualize your financial journey, set goals, and take control of your money—all in one beautiful dashboard.
        </p>
        <div className="flex gap-4 mb-4">
          <Link to="/login" className="add-btn add-btn-fill text-base px-6 py-2">Log In</Link>
          <Link to="/signup" className="add-btn card-btn text-base px-6 py-2">Sign Up</Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative p-8">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 hidden md:block"/>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%]  -right-10 hidden md:block" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute  -bottom-7  -left-5 hidden md:block" />
        <div className="flex flex-col items-center z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center text-[32px] text-white bg-primary rounded-full drop-shadow-xl">
              <LuTrendingUpDown />
            </div>
            <span className="text-lg font-semibold text-primary">Track Your Income & Expenses</span>
          </div>
          <img src={dashboardImg} alt="dashboard preview" className="w-64 lg:w-[90%] shadow-2xl shadow-blue-500/30 rounded-[3px]" />
        </div>
      </div>
    </div>

{/* Stats / Impact Section */}
<div>
<div className="w-full bg-voilet-50  py-16 px-6 md:px-0 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
    Real Results from Real People
  </h2>
  <p className="text-md md:text-lg text-gray-600 max-w-2xl text-center mb-12">
    Expense tracking doesn't just sound good — it works. Here's what real users and studies have shown.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
    <div className="bg-white rounded-2xl shadow-md border border-violet-200 p-8 flex flex-col items-center transition-all hover:shadow-xl">
      <span className="text-5xl font-bold text-fuchsia-600 mb-4">150%</span>
      <p className="text-center text-gray-700 text-sm md:text-base">
      Real case studies show consistent trackers boost their savings dramatically.      
    </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md border border-violet-200 p-8 flex flex-col items-center transition-all hover:shadow-xl">
      <span className="text-5xl font-bold text-fuchsia-600 mb-4">30%</span>
      <p className="text-center text-gray-700 text-sm md:text-base">
        More likely to pay off debt when regularly tracking expenses.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md border border-violet-200 p-8 flex flex-col items-center transition-all hover:shadow-xl">
      <span className="text-5xl font-bold text-fuchsia-600 mb-4">8×</span>
      <p className="text-center text-gray-700 text-sm md:text-base">
       Long-term savers on <strong>Reddit</strong> report growing their savings up to 8× through tracking.</p>
    </div>
  </div>

  <div className="mt-12 text-center max-w-2xl text-gray-600 text-sm md:text-base">
    Join thousands who are taking control of their finances through clarity and intention. 
    Your journey starts with a single step — and a simple tracker.
  </div>
</div>


  {/* Payment Prompt Section */}
  <div className="w-full flex justify-center mt-10 mb-13">
    <div className="bg-white rounded-xl shadow-lg border border-purple-200 px-8 py-6 flex flex-col items-center max-w-2xl w-full">
      <span className="text-xl md:text-2xl font-bold text-purple-700 mb-2">Lifetime Access for just ₹199</span>
      <span className="text-gray-700 text-lg mb-2">Cheaper than a <span className="font-semibold text-primary"> pizza </span>& makes you run your finances like a CEO!</span>
      <span className="text-gray-500 text-sm mb-4">One-time payment. No hidden fees. Unlock all features for life.</span>
    </div>
  </div>
</div>

    {/* FAQ Section */}
    <div className="w-full bg-violet-50 py-12 px-4 md:px-0 flex flex-col items-center">
  <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Frequently Asked Questions</h2>
  <div className="max-w-2xl w-full space-y-6">
    <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-200 transition-transform duration-200 hover:scale-105">
      <h3 className="font-semibold text-lg text-primary mb-2">Is Expense Tracker free to use?</h3>
      <p className="text-gray-600">Expensio requires a one-time payment of ₹ 199. You’ll be prompted to complete the purchase right after signing up—no subscriptions, no hidden fees.</p>
    </div>
    <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-200 transition-transform duration-200 hover:scale-105">
      <h3 className="font-semibold text-lg text-primary mb-2">Is my financial data safe?</h3>
      <p className="text-gray-600">Yes. Your data is encrypted and securely stored. We never share your information with third parties.</p>
    </div>
    <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-200 transition-transform duration-200 hover:scale-105">
      <h3 className="font-semibold text-lg text-primary mb-2">Can I use it on all my devices?</h3>
      <p className="text-gray-600">Definitely! Expense Tracker works seamlessly on desktop, tablet, and mobile—access your dashboard anywhere, anytime.</p>
    </div>
    <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-200 transition-transform duration-200 hover:scale-105">
      <h3 className="font-semibold text-lg text-primary mb-2">How do I get started?</h3>
      <p className="text-gray-600">Sign up with your email to create an account. Right after that, a payment window will open to complete your one-time purchase and unlock full access.</p>
    </div>
  </div>
</div>


    {/* Footer Section */}
    <footer className="w-full bg-violet-50 border-t border-gray-200 py-6 flex flex-col items-center text-center mt-0">
      <div className="text-lg font-semibold text-black mb-1">Thanks for Visiting – Say Hello!</div>
        <div className="text-gray-600 mb-2">Ishita Gupta | India</div>
      <div className="text-gray-600 mb-2">Phone: +91-9893446144</div>
      <div className="flex gap-6 justify-center text-primary text-lg">
        <a href="https://github.com/17GuptaIshita" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <LuGithub size={20} /> 
        </a>
        <a href="https://www.linkedin.com/in/ishitagupta79/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <LuLinkedin size={20} /> 
        </a>
        <a href="mailto:ishitagupta0458@email.com" className="flex items-center gap-1 hover:underline">
          <LuMail size={20} /> 
        </a>
      </div>
      <div className="text-xs text-gray-400 mt-4 border-t border-gray-200 pt-2 w-full text-center">All Rights Reserved</div>
    </footer>
    </div>
  );
};

// Add this CSS to your global styles or in a <style> tag:
/*
.animate-blink {
  animation: blink 1s steps(2, start) infinite;
}
@keyframes blink {
  to { opacity: 0; }
}
*/

export default LandingPage;
