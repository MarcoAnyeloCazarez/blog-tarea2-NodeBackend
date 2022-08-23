const router = require('express').Router()

const authServices = require('./auth.http')

//router.route('/loging')    //! Se usa para cuando usaremos varios verbos en una sola ruta
  //  .post


  //! Para hacer loging se necesita hacer peticiones de tipo post porque no necesita un id para recibirla o pedirla
router.post('/login', authServices.login)  //! Usamos esta forma ya que solo  usareos un solo vervo en este caso

exports.router = router