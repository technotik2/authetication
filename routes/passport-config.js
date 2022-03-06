const localstrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')
const passport = require('passport')

function initialize(passport, getUserByusername, getUserById ){
    const authenticateUser =async(username, password, done)=>{
        const user = getUserByusername(username)
        if (user==null){
            return done(null, false,{message:'username not found'} )
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)

            } else{
                return done(null, false, {message: 'password incorrect'})
            }

        }catch (e){
            return done(e)

        }


    }
    passport.use(new localstrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((username, done)=>done(null, user.id))
    passport.deserializeUser((id, done)=>{
        return done(null, getUserById(id))

    })
        

}
module.exports = initialize