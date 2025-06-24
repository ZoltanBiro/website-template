const express = require('express');
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
  res.send('Users Home Page');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

module.exports = router;