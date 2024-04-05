const sequelize = require('../config/connection');
const { User, Book, Review} = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const books = await Book.bulkCreate(bookData);

    const reviews = await Review.bulkCreate(reviewData);

  process.exit(0);
};

seedDatabase();
