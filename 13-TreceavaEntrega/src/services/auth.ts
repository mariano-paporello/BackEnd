import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config/index';
import  {usersModel}  from '../models/user';
import jwt from "jsonwebtoken"

// JWS PART
  export const generateAuthToken = (user)=>{
    const payload= {
      usedId: user._id,
      username: user.username
    };

    const token = jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: '1m'});
    return token
  }

  export const checkAuth = async (req,res,next)=>{
    const token = req.header['x-login-token'];
      if(!token){
        return res.status(401).json({msg:"NO AUTORIZADO"}) 
      }
      try{
        const decode= jwt.veryify(
          token,
          config.TOKEN_SECRET
        )
        console.log(decode)
        const user = await usersModel.findById(decode.userId)
        req.user = user
      }catch(err){
        console.log(err)
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }

// PASSPORT PART
const strategyOptions = {
  username: "username",
  password: "password",
  passReqToCallback: true,
};

const logIn = async (req, username,password, done) => {
console.log("LOOOGEOOO")
    
  const user = await usersModel.logIn(username, password)
  if(user){
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
      const user=await usersModel.singUp({username, password})
      req.session.nombre =  user.username
      req.session.contraseña= user.password
      
      return done(null,  user)
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