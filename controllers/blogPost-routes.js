const router = require('express').Router();
const {BlogPost, Comment, User} = require('../models')


router.get("/:id", async (req, res)=> {
    console.log("/blogpost/id_______")
    try {
        var blogPostData = await BlogPost.findByPk(req.params.id, {
            include: { model: User }
        })
        if (!blogPostData) {
            res.status(404).json("No blog post found with that ID")
            return
        }
        const blogPost = await blogPostData.get({ plain: true });


        var commentData = await Comment.findAll({
            where: { "blog_post_id": req.params.id }, 
            include: [
              { model: User }
            ]
          })
        if (!commentData) {
            res.status(404).json("Couldn't find comments")
            return
        }
        const comments = await commentData.map((comment)=> comment.get({ plain: true }))

        // console.log("comments______", comments)
        // console.log("blogPost________", blogPost)

        res.render("blogPost", {comments: comments, blogPost: blogPost, loggedIn: req.session.loggedIn})
        return
    } catch (err) {
        res.status(500).json(err)
        return
    }

})

router.get("/comments", async (req, res)=>{
    var commentData = await Comment.findAll({})
        // var commentData = await Comment.findAll({
            // where: { "blog_post_id": req.params.id }, 
            // include: [
            //   { model: BlogPost }, 
            //   { model: User }
            // ]
        //   })
        if (!commentData) {
            res.status(404).json("Couldn't find comments")
            return
        }
        const comments = await commentData.map((comment)=> comment.get({ plain: true }))
})

module.exports = router