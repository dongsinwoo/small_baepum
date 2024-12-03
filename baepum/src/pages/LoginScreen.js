import React, { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #FDF6E3;
  padding: 20px;
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
`;
const Title = styled.h1`
  color: #433422;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  max-width: 343px;
  padding: 12px 16px;
  margin: 8px 0;
  border: 1px solid #E8D5C4;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #d4a373;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 343px;
  padding: 12px;
  margin: 16px 0;
  border: none;
  border-radius: 8px;
  background-color: #d4a373;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c49363;
  }
`;

const GoogleButton = styled(Button)`
  background-color: white;
  border: 1px solid #E8D5C4;
  color: #433422;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;

  &:hover {
    background-color: #F5E6D3;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #433422;
  font-size: 0.9rem;
  margin-top: 16px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인 성공');
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입 성공');
    } catch (error) {
      alert('회원가입 실패: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('구글 로그인 성공');
    } catch (error) {
      alert('구글 로그인 실패: ' + error.message);
    }
  };

  return (
    <Container>
      <Logo src={`${process.env.PUBLIC_URL}/assets/작은배품-logo.png`} alt="logo" />
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp ? '회원가입' : '로그인'}
      </Button>
      <GoogleButton onClick={handleGoogleLogin}>
        <FcGoogle size={20} />
        구글로 시작하기
      </GoogleButton>
      <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? '로그인 화면으로 가기' : '회원가입 화면으로 가기'}
      </ToggleButton>
    </Container>
  );
}

export default LoginScreen;