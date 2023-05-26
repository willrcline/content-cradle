const router = require("express").Router()
const {BlogPost} = require("../../models")

router.post("/", async (req, res)=> {
    var newBlogPostData = req.body
    newBlogPostData.user_id = req.session.user_id

    try {
        BlogPost.create(newBlogPostData)
        
        res.status(200)
        return
    } catch (err) {
        res.status(500)
        return
    }

})

router.put("/", async (req, res)=> {
    console.log("/api/blog put__________")
    var updateData = req.body
    updateData.user_id = req.session.user_id

    try {
        const [numberOfAffectedRows, affectedRows] = await BlogPost.update({ title: updateData.title, content: updateData.content }, {
            where: { id: updateData.blog_post_id },
            returning: true, // needed for affectedRows to be populated
            plain: true // makes sure that the returned instances are just plain objects
          });
        res.status(200)
        return
    } catch (err) {
        res.status(500)
        return
    }
})

router.delete("/", async (req, res)=> {
    console.log("/api/blog delete__________")
    var blog_post_id = req.body.blog_post_id

    try {
        await BlogPost.destroy({where: {id: blog_post_id}})
        
        res.status(200)
        return
    } catch (err) {
        res.status(500)
        return
    }

})

module.exports = router