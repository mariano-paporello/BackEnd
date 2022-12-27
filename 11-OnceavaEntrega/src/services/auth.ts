import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import  {usersModel}  from '../models/user';


const strategyOptions = {
  username: "username",
  password: "password",
  passReqToCallback: true,
};

const logIn = async (req, username,password, done) => {
console.log("LOOOGEOOO")
    
  const user = await usersModel.logIn(username, password)
  if(user){
    console.log("el usuario"+user)
        req.session.nombre= user.username
        req.session.contraseña= user.password
        return done(null, user)
  }else{
    return done(null, false, {msg: "Usuario no encontrado"})
  } 
  };
  
  const signUp = async (req, username, password, done) => {
    console.log('SIGNUP!!');
    try {
      console.log("la data es: "+{username, password})
      const userExiste= usersModel.singUp({username, password})
      req.session.nombre =  username
      req.session.contraseña= password
      console.log("NewUser: "+userExiste)
      return done(null, userExiste)
    } catch (err) {
      console.log('Hubo un error!');
      console.log(err);
      return done(null, false, { mensaje: 'Error Inesperado', err });
    }
  };

export const loginFunc = new LocalStrategy(strategyOptions, logIn);
export const signUpFunc = new LocalStrategy(strategyOptions, signUp);

passport.serializeUser((user:any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    console.log('Se Ejecuta el desserializeUser');
    usersModel.findById(userId).then((user) => {
      return done(null, user);
    })
  });