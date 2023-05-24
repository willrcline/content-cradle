const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/connection.js")
class BlogPost extends Model {}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    modelName: 'blogpost'
    }
)

module.exports = BlogPost