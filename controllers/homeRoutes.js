const router = require('express').Router();
const { User, Book, Comment } = require('../models');
const withAuth = require('../utils/auth');

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

// ?
router.get('/', async (req, res) => {
    try {
        res.json('Goodbye World!');
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
        const bookData = await Book.findAll();

        const books = bookData.map((book) => book.get({ plain: true }));

        res.json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Redirect to comment if user is not logged in
router.get('/comment', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
  module.exports = router;