const {DataTypes, Model } = require("sequelize");
const sequelize = require('../config/connection');


//define the book model
class Book extends Model {}

//define the table columns and configuration
Book.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //title column
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //author column
        Author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //isbn column
        isbn: {
            isbn: DataTypes.STRING,
            allowNull: false
        },
        //pages column
        pages: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        //edition column
        edition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //is_paperback column
        isPaperback: {
            type: DataTypes.Boolean, 
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true, 
        underscored: true,
        modelName: 'bookData'
    }
    
)

module.exports = Book; // Exporting the model
