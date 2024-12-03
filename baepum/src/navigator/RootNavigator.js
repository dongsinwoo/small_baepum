import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import MainNavigator from './MainNavigator';
import LoginScreen from '../pages/LoginScreen';


function RootNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading) {  // 추가
    return <div>Loading...</div>;
  }
  return (
    <div>
      {user ? <MainNavigator /> : <LoginScreen />}
    </div>
  );
}

export default RootNavigator;
