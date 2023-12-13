const express = require('express');
const router = express.Router();

const CategoryRepository = require('../repositories/categoryRepository.js');

router.get('/', async (req, res) => {
    try {
        CategoryRepository.getAllCategories((err, categories) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!categories) {
                res.status(404).json({ error: 'Categories not found' });
                return;
            }
            res.status(200).json(categories);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;