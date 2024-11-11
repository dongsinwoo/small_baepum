import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; 
import './LoginScreen.css'; 

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
    <div className="login-screen">
      <h1>{isSignUp ? '회원가입' : '로그인'}</h1>
      <input 
        type="email" 
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button className="login-button" onClick={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp ? '회원가입' : '로그인'}
      </button>
      <button className="google-button" onClick={handleGoogleLogin}>구글로 로그인</button>
      <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? '로그인 화면으로 가기' : '회원가입 화면으로 가기'}
      </button>
    </div>
  );
}

export default LoginScreen;