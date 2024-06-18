import React from 'react';

const LoggedInModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Đánh giá tên miền</h2>
        <p>Bạn đã đăng nhập. Hãy tiếp tục đánh giá tên miền.</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default LoggedInModal;