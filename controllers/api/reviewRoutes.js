const router = require('express').Router();
const { User, Book, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/findBook', async (req, res) => {
    try {
        const bookData = await Book.findOne({
            where: {
                title: req.body.title,
                author: req.body.author,
            },
        })

        const book = bookData.get({ plain: true });

        res.json({bookId: book.id});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id', withAuth, async (req, res) => {
        console.log(req.body);
        console.log(req.session.user_id);
    try {
        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id,
            book_id: req.body.book_id,
        });
        res.status(200).json(newReview);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;