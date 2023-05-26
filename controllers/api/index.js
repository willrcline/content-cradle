const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const blogPostRoutes = require("./blogPost-routes")

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use("/blog", blogPostRoutes)


module.exports = router;
