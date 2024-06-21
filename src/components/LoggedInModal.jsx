import React from 'react';

const LoggedInModal = ({ visible, hide }) => {
  if (!visible) return null;

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '80%',
    textAlign: 'center'
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <h2>Đánh giá tên miền</h2>
        <p>Bạn đã đăng nhập. Hãy tiếp tục đánh giá tên miền.</p>
        <button onClick={hide} style={{ marginTop: '10px' }}>Đóng</button>
      </div>
    </div>
  );
};

export default LoggedInModal;