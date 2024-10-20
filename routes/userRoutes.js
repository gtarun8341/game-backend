const express = require('express');
const { registerUser, getUsers, getUser,updateUser,changePassword, deleteUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/register', registerUser);
router.get('/users', verifyToken, getUsers);
router.get('/users/getuser', verifyToken, getUser);
router.put('/users/update', verifyToken, updateUser);
router.post('/users/change-password', verifyToken, changePassword);
router.delete('/users/deleteuser', verifyToken, deleteUser);
router.post('/login', loginUser);

module.exports = router;
