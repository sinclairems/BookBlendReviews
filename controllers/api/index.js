const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const searchRoutes = require('./searchRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/search', searchRoutes);
router.use('/books', bookRoutes);

module.exports = router;
