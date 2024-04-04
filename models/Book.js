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
            autoIncrement: true,
          },
        //title column
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //author column
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //isbn column
        isbn: {
            type: DataTypes.STRING,
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
        is_paperback: {
            type: DataTypes.BOOLEAN, 
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true, 
        underscored: true,
        modelName: 'book',
    }  
)

// Exporting the model
module.exports = Book; 
