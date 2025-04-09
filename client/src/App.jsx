import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Result from './pages/result';
import BuyCredit from './pages/buyCredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <ToastContainer position="bottom-right" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
