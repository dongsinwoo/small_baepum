import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';
import PaymentScreen from './PaymentScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<MainScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
      </Routes>
    </Router>
  );
}

export default App;