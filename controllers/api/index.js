const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/search', searchRoutes);

module.exports = router;
