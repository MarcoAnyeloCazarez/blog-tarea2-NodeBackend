const bcrypt = require('bcrypt')
const crypt = require('../utils/crypt')

const hashPassword = (plainPassword) => {       //! Le pasamos la contraseña a encriptar
    return bcrypt.hashSync(plainPassword, 10)    //! (contraseñaAEncriptar, numeroDevecesAIterarLaEncriptación)
} 

const comparePassword = (plainPassword, hashedPassword) => {    //! para comparar contraseñas y ver que coincida con la del usuario
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}