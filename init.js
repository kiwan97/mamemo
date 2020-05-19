import app from "./app";
import "./db";

const handleListening =()=> console.log("Listening - localhost:5000");

app.listen(5000,handleListening);