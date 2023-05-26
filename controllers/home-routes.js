const router = require('express').Router();
const {BlogPost} = require('../models');
const {User} = require("../models")
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: { model: User }
    });
    

    const blogPosts = blogPostData.map((blogPost) => {
      const plainBlogPosts = blogPost.get({ plain: true });
      plainBlogPosts.createdAtFormatted = dayjs(plainBlogPosts.createdAt).format('MMMM D, YYYY h:mm:ss A');
      return plainBlogPosts;
  });
    console.log("blogPosts_________________", blogPosts)

    res.render('home', {blogPosts: blogPosts, loggedIn: req.session.loggedIn, userEmail: req.session.email});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one blogPost
// router.get('/blogPost/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     // If the user is logged in, allow them to view the blogPost
//     try {
//       const dbblogPostData = await blogPost.findByPk(req.params.id, {
//         include: [
//           {
//             model: Painting,
//             attributes: [
//               'id',
//               'title',
//               'artist',
//               'exhibition_date',
//               'filename',
//               'description',
//             ],
//           },
//         ],
//       });
//       const blogPost = dbblogPostData.get({ plain: true });
//       res.render('blogPost', { blogPost, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

// // GET one painting
// router.get('/painting/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     // If the user is logged in, allow them to view the painting
//     try {
//       const dbPaintingData = await Painting.findByPk(req.params.id);

//       const painting = dbPaintingData.get({ plain: true });

//       res.render('painting', { painting, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
