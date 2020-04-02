import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// var express = require('express');
const app = express();

const middleWares = (req,res,next) =>{
    console.log("Middlewares");
    next();
}
// respond with "hello world" when a GET request is made to the homepage

const handleHome = (req,res) => res.send("Homeddd");
const handleProfile = (req,res) => res.send("Profile");
// app.listen(5000,handleListening);
app.use(middleWares);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(helmet());
app.get('/', handleHome);
app.get('/profile',handleProfile);

export default app;