const router = require("express").Router()
const {BlogPost, User} = require("../models")
const dayjs = require('dayjs');
const withAuth = require("../utils/auth")

router.get("/", withAuth, async (req, res)=>{
    var blogPostData = await BlogPost.findAll({
        where: { "user_id": req.session.user_id }, 
        include: [
          { model: User }
        ]
      })
    if (!blogPostData) {
        res.status(404).json("Couldn't find blogPosts with that user_id")
        return
    }
    const blogPosts = blogPostData.map((blogPost) => {
      const plainBlogPosts = blogPost.get({ plain: true });
      plainBlogPosts.createdAtFormatted = dayjs(plainBlogPosts.createdAt).format('MMMM D, YYYY h:mm:ss A');
      return plainBlogPosts;
  });
    res.render("dashboard", {blogPosts: blogPosts, loggedIn: req.session.loggedIn, userEmail: req.session.email})
})

module.exports = router