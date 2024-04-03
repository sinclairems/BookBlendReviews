const sequelize = require('../config/connection');
const { User, Book, Comment} = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const books = await Book.bulkCreate(bookData);

    const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
