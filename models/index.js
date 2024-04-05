const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');

// User has many Reviews
User.hasMany(Review, {
    foreignKey: 'user_id'
});

// Review belongs to User
Review.belongsTo(User, {
    foreignKey: 'user_id'
});

// Book has many Reviews
Book.hasMany(Review, {
    foreignKey: 'book_id'
});

// Review belongs to Book
Review.belongsTo(Book, {
    foreignKey: 'book_id'
});

module.exports = { User, Book, Review};
