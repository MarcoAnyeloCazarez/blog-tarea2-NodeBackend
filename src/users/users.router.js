//!  En este archivo se usan los vervos y los servicios que cada uno usará, se hara referencia a las funciones del archivo http.js

const router = require("express").Router()  
const passport = require('passport')
require('../middlewere/auth.middleware')(passport)

const usersServices = require('./users.http')
const postsServices = require('../posts/posts.http')

router.route('/') //  /api/v1/users
    .get(usersServices.getAll)
    .post(usersServices.registerUser)

router.route('/me')
    .get(passport.authenticate('jwt',{session: false}),usersServices.getUser)
    .put(passport.authenticate('jwt',{session: false}),usersServices.editMyUser)      //! De esta anera se protege la rura, solo se puede entrar si se generó algun token
    .delete(passport.authenticate('jwt',{session: false}),usersServices.removeUser)

router.route('/me/posts')
    .get(passport.authenticate('jwt', {session: false}), postsServices.postsByUser)


router.route('/:id')
    .get(usersServices.getUsersById)
    .delete(usersServices.remove)
    .put(usersServices.edit)
    
exports.router = router

