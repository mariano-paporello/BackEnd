import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {hash, compare, genSalt} from "bcrypt"
import  userModel  from '../models/user';


const strategyOptions = {
  usernameField: 'userName',
  passwordField: 'contraseña',
  passReqToCallback: true,
};

const logIn = async (req, userName:string, contraseña:string, done) => {
    console.log('LOGIN!!');
    
    const posibleUser:any = await userModel.findOne( {username: userName});
    const userexist= await compare(contraseña, posibleUser?.password)
    console.log(userexist)
    if (!userexist||userexist==null){
      
       console.error("Usuario no encontrado");
       return done(null, false, {msg: "usuario no encontrado"})
      }
      else{
        console.log('ENCONTRE UN USUARIO');
        return done(null, posibleUser );
      } 
    
  };
  
  const signUp = async (req, userName:string, contraseña:string, done) => {
    console.log('SIGNUP!!');
    try {
      const salt = await genSalt(10)
      const contraseñaHashed= await hash(contraseña, salt)
      console.log("contraseña hashed: "+contraseñaHashed)
      const usuarioExiste:any= await userModel.findOne({$and:[{username: userName},{password:contraseñaHashed}]})
      if(!usuarioExiste){
      const newUser = await  userModel.create({ username:userName, password:contraseñaHashed });
      console.log("NewUser: "+newUser)
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