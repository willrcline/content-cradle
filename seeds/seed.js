const sequelize = require('../config/connection')
const {Comment, User, BlogPost } = require('../models');

const blogPostData = require('./blogPostData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // await BlogPost.bulkCreate(blogPostData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();
