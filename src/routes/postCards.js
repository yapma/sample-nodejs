const express = require('express');
const router = express.Router();

const PostCardRepository = require('../repositories/postCardRepository.js');
const PostCard = require('../models/postCard.js');

router.get('/', async (req, res) => {
    try {
        PostCardRepository.getAllPostCards((err, card) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!card) {
                res.status(404).json({ error: 'PostCard not found' });
                return;
            }
            res.status(200).json(card);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', (req, res) => {
    const { name, description, category } = req.body;
    const card = new PostCard(name, description, category)
    PostCardRepository.createPostCard(card);
    res.status(201).json({ message: 'PostCard created successfully' });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, category } = req.body;
    const card = new PostCard(name, description, category)
    PostCardRepository.updatePostCardById(id, card);
    res.status(200).json({ message: 'PostCard updated successfully' });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    PostCardRepository.deletePostCardById(id);
    res.status(200).json({ message: 'PostCard deleted successfully' });
});

module.exports = router;