const router = require('express').Router();
const { Book } = require('../../models');

router.get('/length', async (req, res) => {
    try {
        const bookIds = await Book.findAll({ attributes: ['id'] });
        res.json(bookIds.length);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;