import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
   } from "react-router-dom";
import { Toaster } from 'react-hot-toast';  
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import LogIn from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage';
import UserProvider from './context/UserContext';

const App = () => {
    return (
    <UserProvider>
    <div className=''>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/redirect" element={<Root/>} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
          <Route path="/login" exact element={<LogIn />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />

        </Routes>
      </Router>
    </div>
    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize: "13px",
      }
    }}
    />
    </UserProvider>
  )
}

export default App;

const Root = () => {
  //check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ): (
    <Navigate to="/login" />
  );
};