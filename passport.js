import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import {googleLoginCallback} from "./controllers/userController"
import User from "./models/User";


passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: "46573947228-l62q2pis3ev1dofjqt8pgh50np6o394e.apps.googleusercontent.com",
    clientSecret: "DVQWXmSbbJG2aM8jVbzsb6-o",
    callbackURL: "http://localhost:5000/auth/google/callback"
  },googleLoginCallback
  
  ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());