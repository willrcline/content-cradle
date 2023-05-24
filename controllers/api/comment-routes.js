const router = require('express').Router();
const {Comment} = require("../../models")

router.post("/", async (req, res)=> {
    var newCommentData = req.body
    newCommentData.user_id = req.session.user_id

    try {
        console.log("/comment req.body_______", newCommentData)
        Comment.create(newCommentData)
        
        res.status(200)
        return
    } catch (err) {
        res.status(500)
        return
    }

})

module.exports = router