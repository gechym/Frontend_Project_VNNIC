import React, { useEffect } from 'react';
import Footer from './layout/footer';
import Header from './layout/header';

const API_BASE_URL = 'localhost:3000' || process.env.REACT_APP_API_URL;

function App() {
  useEffect(() => {
    // Gọi API từ backend
    fetch(`${API_BASE_URL}/api/test_mongo_connection`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Xử lý dữ liệu nhận được từ backend ở đây
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Header isLoggedIn={false} /> {/* Chỉ định giá trị isLoggedIn tại đây */}
      <Footer />
    </>
  );
}

export default App;