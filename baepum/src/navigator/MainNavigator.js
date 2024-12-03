import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/MainScreen';
import NavBar from '../components/NavBar';
import PaymentScreen from '../pages/PaymentScreen';
import MyScreen from '../pages/MyScreen';

function MainNavigator() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/mypage" element={<MyScreen />} />
      </Routes>
      <NavBar />
    </Router>
  );
}

export default MainNavigator;
