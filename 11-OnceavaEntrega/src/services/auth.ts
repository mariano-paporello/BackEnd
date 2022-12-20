import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import  userModel  from '../models/user';

const strategyOptions = {
  usernameField: 'userName',
  passwordField: 'contraseña',
  passReqToCallback: true,
};

const logIn = async (req, userName, password, done) => {
    console.log('LOGIN!!');
    const user = await userModel.findOne({ userName, password });
  
    if (!user) return done(null, false, { mensaje: 'Usuario no encontrado' });
  
    console.log('ENCONTRE UN USUARIO');
    return done(null, user);
  };
  
  const signUp = async (req, userName, password, done) => {
    console.log('SIGNUP!!');
    try {
      const newUser = await userModel.create({ userName, password });
      return done(null, newUser);
    } catch (err) {
      console.log('Hubo un error!');
      console.log(err);
      return done(null, false, { mensaje: 'Error Inesperado', err });
    }
  };

export const loginFunc = new LocalStrategy(strategyOptions, logIn);
export const signUpFunc = new LocalStrategy(strategyOptions, signUp);

passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    console.log('Se Ejecuta el desserializeUser');
    userModel.findById(userId).then((user) => {
      return done(null, user);
    })
  });