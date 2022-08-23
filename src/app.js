//* Dependencias
const express = require('express')
const passport = require('passport')
require('./middlewere/auth.middleware')(passport)     //esta manera se usa para proeger una ruta, importar passport y a la ruta psarle passport

//* Archivos derutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router

//* Configuraciones iniciales
const app = express()
app.use(express.json())  //Esta configuración es para habilitar el req.body en el archivo http.js

app.use(express.json())   //!para recibir y manipular información

app.get('/', (req, res) => {     //!peticion a la ruta raiz
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRouter)     // el userRouter es un middlewere, es una funcion que e lleva a cabo dentro de otra
//app.use('/api/v1/users/:id', userRouter)
app.use('/api/v1/auth', authRouter)

// passport.authenticate('jwt', {session: false}), 
    //(req, res) => {
    //res
        //.status(200)
        //.json({message: 'tienes credenciales corriendo', email: req.user.email})  //passport en request nos da un objeto que se llama user, y podemos ya entrar a las propiedades
//})

app.listen(8000, () => {
    console.log('server started at port 8000')
})