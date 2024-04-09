const router = require('express').Router();
const { User, Book, Review } = require('../models');
const withAuth = require('../utils/auth');
const { getRandom, rate, ratingForm, ratingBackground } = require('../utils/helpers');

// Render Star Rating
router.get('/', async (req, res) => {
    try {
        const rating = ratingForm;
        const background = ratingBackground;
        res.render('homepage', {
            rating,
            background,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Go to user profile if logged in
router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Review, include: Book }]
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

// See User Reviews if logged in
router.get('/review', withAuth, async (req, res) => {
    try {
        res.render('review', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a random book
router.get('/book', async (req, res) => {
    try {
        const bookIds = await Book.findAll({ attributes: ['id'] });
        const randomindex = getRandom(bookIds.length);
        const randomId = bookIds[randomindex].id;

        res.redirect(`/book/${randomId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/book/:id', async (req, res) => {
    try {

        const starForm = ratingForm;
        const background = ratingBackground;

        const bookData = await Book.findByPk(req.params.id, {
            include: [
                {
                    model: Review,
                    include: User
                },
            ]
        });

        const book = bookData.get({ plain: true });

        res.render('book', {
            ...book,
            starForm,
            background,
            logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

// Redirect to login if user is not logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect(req.session.redirectTo || '/profile');
      delete req.session.redirectTo;
      return;
    }
  
    res.render('login');
  });



// Get book by author
router.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author.replace(/-/g, ' ');

        const bookData = await Book.findAll({
            where: {
              author: author
            },
          });

        const books = bookData.map((book) => book.get({ plain: true }));

        if (books.length === 0) {
            res.status(404).json({ message: 'No author found with this name!' });
            return;
        }

        const authorDisplay = author.toUpperCase();

        res.render('author', {
            books,
            authorDisplay,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
  
  module.exports = router;