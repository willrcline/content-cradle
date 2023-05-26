const router = require('express').Router();
const {BlogPost, Comment, User} = require('../models')
const dayjs = require('dayjs');


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
        blogPost.createdAtFormatted = dayjs(blogPost.createdAt).format('MMMM D, YYYY h:mm:ss A');


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
        const comments = commentData.map((comment) => {
            const plainComment = comment.get({ plain: true });
            plainComment.createdAtFormatted = dayjs(plainComment.createdAt).format('MMMM D, YYYY h:mm:ss A');
            return plainComment;
        });

        // console.log("comments______", comments)
        // console.log("blogPost________", blogPost)

        res.render("blogPost", {comments: comments, blogPost: blogPost, loggedIn: req.session.loggedIn, userEmail: req.session.email})
        return
    } catch (err) {
        res.status(500).json(err)
        return
    }

})

router.get("/edit", async (req, res)=> {
    console.log("test____")
})

router.get("/edit/:id", async (req, res)=> {
    console.log("/blog/edit_________")
    //user id should be passed into the data-user-id of the title of the post
    //ToDo If ! user id of this blog post == req.session.user_id {redirect to home}
    try {
        var blogPostData = await BlogPost.findByPk(req.params.id, {
        })
        if (!blogPostData) {
            res.status(404).json("No blog post found with that ID")
            return
        }
        const blogPost = await blogPostData.get({ plain: true });
        blogPost.createdAtFormatted = dayjs(blogPost.createdAt).format('MMMM D, YYYY h:mm:ss A');


        res.render("editBlogPost", {blogPost: blogPost, loggedIn: req.session.loggedIn, userEmail: req.session.email})
        return
    } catch (err) {
        res.status(500).json(err)
        return
    }

})

module.exports = router