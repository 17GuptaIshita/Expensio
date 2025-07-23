const express = require('express');
const Router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const{
    registerUser,
    loginUser,
    getUserInfo,
} = require('../controllers/authController');

Router.post('/register', registerUser);
Router.post('/login', loginUser);
Router.get('/getUser', protect , getUserInfo);

Router.post('/upload-image',upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});
module.exports = Router;