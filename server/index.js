import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
dotenv.config()

//consts
const PORT = process.env.PORT || 3003
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//middleware
app.use(cors())
app.use(express.json())


app.use("/api", router)

async function start(){
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.8zqbbu1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

        app.listen(PORT, () => console.log(`Server starten on PORT: ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}
start()
