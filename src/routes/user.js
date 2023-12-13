const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserRepository = require('../repositories/userRepository.js');
const User = require('../models/user.js');
const { authorize } = require('../common/authorize.js');

router.get('/', authorize, async (req, res) => {
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

router.get('/me', authorize, async (req, res) => {
    try {
        const email = req.userEmail;
        res.status(200).json({ email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        UserRepository.login(email, (err, user) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!user) {
                res.status(404).json({ error: 'username or password incorrect' });
                return;
            }

            bcrypt.compare(password, user.Password, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (!result) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                const token = jwt.sign({ userId: user.Id, userEmail: user.Email }, 'secret', { expiresIn: '1h' });
                res.status(200).json({ token });
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/sign-up', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        const user = new User(firstName, lastName, email, hash)
        UserRepository.createUser(user);
        res.status(201).json({ message: 'User created successfully' });
    });
});

module.exports = router;