const express = require('express');
const router = express.Router();

const UserRepository = require('../repositories/userRepository.js');
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        UserRepository.getAllUsers((err, user) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = new User(firstName, lastName, email, password)
    UserRepository.createUser(user);
    res.status(201).json({ message: 'User created successfully' });
  });

module.exports = router;