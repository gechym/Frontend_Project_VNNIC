import React, { useState } from 'react';
import Footer from './layout/footer'
import Header from './layout/header'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Footer/>
    </>
  )
}

export default App
