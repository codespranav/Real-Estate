import express from "express";
import { connectToDB } from "./config/db.js";
import auth from "./routes/auth.js";
const app = express();
const port = 4000;
connectToDB();

app.use(express.json());
app.use("/api/auth", auth)

app.get("/", (req, res)=>{
    res.send("Hello World")
})
app.get("/welcome", (req, res)=>{
    res.send("Welcome World")
})

app.listen(port, ()=>{
    console.log(`app is running on ${port}`)
})