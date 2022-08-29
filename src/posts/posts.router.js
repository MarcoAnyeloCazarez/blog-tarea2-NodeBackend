const router = require('express').Router()
const passport = require('passport')
require('../middlewere/auth.middleware')(passport)

const postsServices = require('./posts.http')
  
router.route('/')  //      /api/v1/posts 
    .get(postsServices.getAllPost)
    .post(passport.authenticate('jwt',{session: false}),postsServices.newPost)

router.route('/me/posts')
    .get(passport.authenticate('jwt', {session: false}), postsServices.getAllPost)

router.route('/:id')
    .get(postsServices.getOnePost)


exports.router = router