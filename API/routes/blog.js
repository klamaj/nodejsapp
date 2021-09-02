require('dotenv').config();
const express = require('express');

// Auth
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Articles = require('./../models/articles');

// Login Endpoint
router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
);

// signup endpoint
router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
);

// post json data
router.post('/custom/article/', (req, res, next) => {
    let a = new Articles({
        title: req.body.title,
        text: req.body.text
    }).save().then( result => {
        res.status(200).json(result);
    });
});

// Get 
router.get('/articles/', (req, res, next) => {
    Articles.find().then((response) => {
        res.status(200).json({message: "Booom", article:response.data});
    })
    .catch( error => {
        res.status(500).json({message: "WRONG", article:error})
    });
});

// Def post
router.post('/add/article/', (req, res, next) => {
    let a = new Articles({
        title: "Node.js Learning",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }).save().then( result => {
        res.status(200).json(result);
    });
});

module.exports = router;