import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import  userModel  from '../models/user';


const strategyOptions = {
  usernameField: 'userName',
  passwordField: 'contraseña',
  passReqToCallback: true,
};

const logIn = async (req, userName:String, contraseña:String, done) => {
    console.log('LOGIN!!');
    
    const user = await userModel.findOne({ $and:[{username: userName}, {password:contraseña}] });
    console.log(user)
    if (!user||user==null){
      
       console.error("Usuario no encontrado");
       return done(null, false, {msg: "usuario no encontrado"})
      }
      else{
        console.log('ENCONTRE UN USUARIO');
        return done(null, user );
      } 
    
  };
  
  const signUp = async (req, userName:String, contraseña:String, done) => {
    console.log('SIGNUP!!');
    try {
      const usuarioExiste:any= await userModel.findOne({$and:[{username: userName},{contraseña:contraseña}]})
      if(!usuarioExiste){
      const newUser = await  userModel.create({ username:userName, password:contraseña });
      return done(null, newUser)
    }
    else{
      return done(null, false, {mensaje: 'Datos ya existentes con otro usuario'})
    };
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
    userModel.findById(userId).then((user) => {
      return done(null, user);
    })
  });