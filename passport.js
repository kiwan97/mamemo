import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import User from "./models/User";
import {googleLoginCallback} from "./controllers/userController"


passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_PW,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },googleLoginCallback
  
  ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());