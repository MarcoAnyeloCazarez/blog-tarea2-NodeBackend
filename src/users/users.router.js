//!  En este archivo se usan los vervos y los servicios que cada uno usará, se hara referencia a las funciones del archivo http.js

const router = require("express").Router()
const passport = require('passport')
require('../middlewere/auth.middleware')(passport)

const usersServices = require('./users.http')

router.route('/') //  /api/v1/users
    .get(usersServices.getAll)
    .post(usersServices.registerUser)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}),usersServices.editMyUser)      //! De esta anera se protege la rura, solo se puede entrar si se generó algun token
    .get(passport.authenticate('jwt',{session: false}),usersServices.getUser)
    .delete(passport.authenticate('jwt',{session: false}),usersServices.removeUser)
    

router.route('/:id')
    .get(usersServices.getUsersById)
    .delete(usersServices.remove)
    .put(usersServices.edit)
    
exports.router = router
