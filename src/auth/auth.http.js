//! se manejan respuestas, recepcion de datos y errores. Tambien la gestion de los TOKENS
const jwt = require('jsonwebtoken')    // importamos libreria para generar el TOKEN, esta es JWT

const { loginUser } = require("./auth.controllers")


const login = (req, res) => {
    const data = req.body

    if(!data.email || !data.password){
        return res.status(400).json({message: 'Missing data'})
    }

    const response = loginUser(data.email, data.password)

    if(response){

        const token = jwt.sign({      //? manejamos la información para generar el token
            id: response.id,
            email: response.email,
            rol: response.rol
        }, 'academlo')

        return  res.status(200).json({message: 'Tus credenciales son correctas', token})   //? le debemos pasar el token en este punto
    }else{
        return res.status(400).json({message: 'Invalid credentials'})
    }
}


module.exports = {
    login
}