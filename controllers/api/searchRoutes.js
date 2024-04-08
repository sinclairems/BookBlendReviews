const router = require('express').Router();
const { User, Book, Review } = require('../../models');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
    let search = req.body.search.toLowerCase();

    try {
        const books = await Book.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        author: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        });

        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while searching for books.' });
    }
});

module.exports = router;