import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import {memoUploads,homeMemo} from "./controllers/memoController"; 
import {getJoin,postJoin,getLogin,postLogin,getLogout} from "./controllers/userController";

import "./passport";
// var express = require('express');
const app = express();

const CokieStore = MongoStore(session);

const middleWares = (req,res,next) =>{
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
}
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

app.get("/join",getJoin);
app.post("/join",postJoin,postLogin);

app.get("/login",getLogin);
app.post("/login",postLogin);

app.get("/logout",getLogout);

app.get('/profile',handleProfile);

export default app;