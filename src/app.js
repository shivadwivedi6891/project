import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()
app.use(cors({

    origiin:process.env.CORS_ORIGIN,
    credentials: true

}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//import routes

import userRouter from './routes/user.routes.js'


// rotes declaration

app.use("/api/v1/users",userRouter)



export {app}