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

module.exports = { User, Book, Comment};
