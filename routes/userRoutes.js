const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const users = require('../models/userModel');

// Route pour obtenir les infos de l'utilisateur connecté
router.get('/me', protect, (req, res) => {
  res.json({ email: req.user.email });
});

// Route pour obtenir tous les utilisateurs (sans les mots de passe)
router.get('/users', protect, (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...u }) => u);
  res.json(usersWithoutPasswords);
});

// Route pour supprimer un utilisateur
router.delete('/users/:id', protect, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur introuvable' });
  users.splice(index, 1);
  res.json({ message: 'Utilisateur supprimé' });
});

module.exports = router;
