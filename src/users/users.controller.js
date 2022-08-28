const uuid = require('uuid')
const { hashPassword, comparePassword } = require('../utils/crypt')   //! importamos las funciones para encriptar y desencriptar, hechas en el archivo crypts

const userDB = [{
    "id": "e7189119-8f6c-4174-8425-201d178bb231",
    "first_name": "Anyelo",
    "last_name": "Cazarez",
    "email": "anyelocaba7@gmail.com",
    "password": "$2b$10$lWGgHOA8gqEA/Yn6Wz8DM.51ng0HS.gcz5IWf6G.7Sa.xqg4.wOOK",
    "phone": "4435796418",
    "birthday_date": "02/03/1994",
    "rol": "normal",
    "profile_image": "",
    "country": "México",
    "is_active": true,
    "verified": false
}]

const getAllUsers = () => {  
    return userDB       //! Siempre se rrtotna algo en las funciones para poder contolar los errores
    //? COMANDO SQL EQUIVALENTE: select * from users;
}

const getUserById = (id) => {
    const data = userDB.filter(item => item.id === id)   //! me regresa un arreglo con el id que coincida con el de la peticion
    if (data.length > 0){
        return data[0]
    }else {
        return null
    }
    //? COMANDO SQL EQUIVALENTE: select * from users where id = ${id};
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(),             //Oblligatorio y único      //!  uuid crea un identificador único 
        first_name: data.first_name,     //Oblligatorio
        last_name: data.last_name,      //Oblligatorio
        email: data.email,          //Obligatorio y único
        password: hashPassword(data.password),       //Oblligatorio    //! Corremos la función para encriptar la contraseña y le pasamos la contrasela a encriptar 
        phone: data.phone ? data.phone : '',          //Único       //! usamos operador ternario (?), es como in if
        birthday_date: data.birthday_date,  //Oblligatorio
        rol: 'normal',            //Oblligatorio y por defecto "normal"
        profile_image: data.profile_image ? data.profile_image : '',
        country: data.country,        //Obligatorio
        is_active: true,    //Oblligatorio y por defecto true
        verified: false
    }
    userDB.push(newUser)
    return(newUser)
}

//createUser({password: 'root'})

const deleteUser = (id) => {
    const index = userDB.findIndex(user => user.id === id)
    if (index !== -1){
        userDB.splice(index, 1)
    }else {
        return false
    }
    
}

const editUser =  (id, data) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB[index] = {
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: userDB[index].password,
            phone: data.phone ? data.phone : '',
            birthday_date: data.birthday_date,
            rol: data.rol,
            profile_image: data.profile_image,
            country: data.country,
            is_active: data.is_active,
            verified: false
        }
        return userDB[index]
    }else{
        createUser(data)
    }
} 

const getUserByEmail = (email) => {
    const data = userDB.filter((item) => item.email === email);
    return data.length ? data[0] : false
    //? select * from users where email = ${email};
}
  

module.exports = {
    getAllUsers,
    editUser,
    getUserById,
    deleteUser,
    createUser,
    getUserByEmail
}


