const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const blogPostRoutes = require("./blogPost-routes")
const dashboardRoutes = require("./dashboard-routes")

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogpost', blogPostRoutes)
router.use("/dashboard", dashboardRoutes)

module.exports = router;
