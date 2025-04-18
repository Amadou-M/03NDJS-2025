const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const users = require('../models/userModel');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', protect, (req, res) => {
  res.json({ email: req.user.email });
});

router.get('/users', protect, (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...u }) => u);
  res.json(usersWithoutPasswords);
});

router.delete('/users/:id', protect, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur introuvable' });
  users.splice(index, 1);
  res.json({ message: 'Utilisateur supprimé' });
});

module.exports = router;