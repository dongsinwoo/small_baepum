import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';
import PaymentScreen from './pages/PaymentScreen';
import MyScreen from './pages/MyScreen';
import NavBar from './components/NavBar';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
  );
}

export default App;