const BlogPost = require("./BlogPost")
const User = require("./User")
const Comment = require("./Comment")

BlogPost.hasMany(Comment, {foreignKey: "blog_post_id"})
Comment.belongsTo(BlogPost, {foreignKey: "blog_post_id"})

User.hasMany(BlogPost, {foreignKey: "user_id"})
BlogPost.belongsTo(User, {foreignKey: "user_id"})

User.hasMany(Comment, {foreignKey: "user_id"})
Comment.belongsTo(User, {foreignKey: "user_id"})

module.exports = {
    BlogPost,
    User,
    Comment
}