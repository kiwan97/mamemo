import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import {middleWares,onlyPrivate,onlyPublic} from "./middlewares"
import {memoUploads,homeMemo} from "./controllers/memoController"; 
import {getJoin,postJoin,getLogin,postLogin,getLogout} from "./controllers/userController";

import "./passport";
// var express = require('express');
const app = express();

const CokieStore = MongoStore(session);


// respond with "hello world" when a GET request is made to the homepage

const handleProfile = (req,res) => res.send("Profile");
// app.listen(5000,handleListening);


app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(helmet());
app.use(
    session({
        secret: process.env.COOKIE_HASH,
        resave: true,
        saveUninitialized: false,
        store: new CokieStore({ mongooseConnection: mongoose.connection })
    })
    );
app.use(passport.initialize());
app.use(passport.session());

app.use(middleWares);

console.log(process.env.COOKIE_HASH);


app.get('/', homeMemo);
app.post("/memo",memoUploads);

app.get("/join",onlyPublic,getJoin);
app.post("/join",onlyPublic,postJoin,postLogin);

app.get("/login",onlyPublic,getLogin);
app.post("/login",onlyPublic,postLogin);

app.get("/logout",onlyPrivate,getLogout);

app.get('/profile',onlyPrivate,handleProfile);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export default app;