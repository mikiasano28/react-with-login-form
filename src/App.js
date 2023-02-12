import React, { useState, useEffect } from 'react';

import Login from './components/Login';
import Home from './components/Home';
import MainHeader from './components/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // このコードだと無限ループになる
  // const storedUserLoggedInInformation = localStorage.getItem(isLoggedIn);

  // if(storedUserLoggedInInformation === '1') {
  //   setIsLoggedIn(true);
  // }

  // useEffect -> useEffect(() => {}, [dependencies])
  // [dependencies]が変更された時のみcallbackakん数が走る
  // useEffectのcallback関数の中にsetIsLoggedIn()関数を書くと無限ループになるので注意

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn: false}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;





