const router = require('express').Router();
const { User, Book, Review } = require('../../models');
const { Op } = require('sequelize');
const Fuse = require('fuse.js');
const { toLowerCase, replace } = require('../../utils/helpers');




router.post('/', async (req, res) => {
    let search = req.body.search.toLowerCase();

    try {
        const books = await Book.findAll();

        const options = {
            keys: ['title', 'author']
        };

        const fuse = new Fuse(books, options);

        const results = fuse.search(search);

        console.log(results);

        res.json(results);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while searching for books.' });
    }
});

router.post('/results', async (req, res) => {
    let search = req.body.search.toLowerCase();

    try {
        const books = await Book.findAll();

        const options = {
            keys: ['title', 'author']
        };

        const fuse = new Fuse(books, options);

        const results = fuse.search(search);

        const resultsData = results.map(result => {
            return {
                id: result.item.id,
                title: result.item.title,
                author: result.item.author,
                pages: result.item.pages
            };
        });

        req.session.resultsData = resultsData;

        res.redirect('/results');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while searching for books.' });
    }


});

module.exports = router;