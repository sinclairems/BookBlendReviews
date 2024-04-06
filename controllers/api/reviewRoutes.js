const router = require('express').Router();
const { User, Book, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Book,
                    attributes: ['title', 'author'],
                },
            ],
        });

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        res.render('reviews', {
            reviews,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedReview = await Review.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!reviewData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;