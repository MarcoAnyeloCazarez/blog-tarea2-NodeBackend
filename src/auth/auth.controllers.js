const { comparePassword } = require("../utils/crypt")
const { getUserByEmail } = require("../users/users.controller")

const loginUser = (email, password) => {
    const user = getUserByEmail(email)
    //? user.password
    //* password
    if(user){
        const verify_password = comparePassword(password, user.password)    
        if(verify_password){
            return user
        }
    }
    return false
    
}

module.exports = {
    loginUser
}