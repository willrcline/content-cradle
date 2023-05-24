const sequelize = require("../config/connection");
const {Model, Datatypes, DataTypes} = require("sequelize")

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogpost',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        model: "comment",
    }
)

module.exports = Comment