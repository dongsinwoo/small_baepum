import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';
import PaymentScreen from './pages/PaymentScreen';
import MyScreen from './pages/MyScreen';
import NavBar from './components/NavBar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #fff5e6;
  }
`;
function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/mypage" element={<MyScreen />} />
        </Routes>
        <NavBar />
      </Router>
    </>
>>>>>>> c106d38 ([신동우]: 전체적으로 검토 및 수정 작업 진행(api: 추가, 메인페이지: 수정, 사용자페이지: 추가))
  );
}

export default App;