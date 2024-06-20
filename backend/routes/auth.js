import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// POST /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
    // Tìm user bằng username
    const user = await User.findOne({ username });

    // Kiểm tra nếu user tồn tại và password khớp
    if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Đăng nhập thành công
    return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
    }
});
  

export default router;
