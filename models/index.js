const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

// User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Comment belongs to User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Book has many Comments
Book.hasMany(Comment, {
    foreignKey: 'book_id'
});

// Comment belongs to Book
Comment.belongsTo(Book, {
    foreignKey: 'book_id'
});

module.exports = { User, Book, Comment};
