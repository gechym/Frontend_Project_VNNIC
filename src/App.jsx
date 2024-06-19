import React, { useEffect, useState } from 'react';
import Footer from './layout/footer'
import Header from './layout/header'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
//gọi api từ backend
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Footer/>
    </>
  )
}

export default App;
