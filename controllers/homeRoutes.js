const router = require('express').Router();
const { User, Book, Review } = require('../models');
const withAuth = require('../utils/auth');
const getRandomBook = require('../utils/helpers');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/review', withAuth, async (req, res) => {
    try {
        res.render('review');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/book/:id', async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id, {
            include: [
                {
                    model: Review,
                    include: User
                }
            ]
        });

        const book = bookData.get({ plain: true });

        res.render('book', {
            ...book,
            logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

// ?
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

// ?
router.get('/user', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });

        const users = userData.map((user) => user.get({ plain: true }));

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Redirect to book if user is not logged in
router.get('/book', async (req, res) => {
    try {

        const bookData = await Book.findByPk();

      res.render('book', {
        ...book,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Redirect to review if user is not logged in
router.get('/review', async (req, res) => {
    try {
        const reviewData = await Review.findAll();

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        res.json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comments', async (req, res) => {
    try {
        const reviewData = await Review.findAll();

        const reviews = reviewData.map((review) => review.get({ plain: true }));

        res.json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
}
);
  
  module.exports = router;