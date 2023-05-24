const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const blogPostRoutes = require("./blogPost-routes")

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogpost', blogPostRoutes)

module.exports = router;
