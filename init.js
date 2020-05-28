import dotenv from "dotenv";
import "./db";
import app from "./app";

const handleListening =()=> console.log("Listening - localhost:5000");

app.listen(5000,handleListening);