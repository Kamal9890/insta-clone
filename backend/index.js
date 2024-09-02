import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
dotenv.config({});
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import messageRoute from "./routes/message.route.js"
import { app,server } from "./socket/socket.js";
import path from "path"


const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();


// app.get("/" ,(req,res)=>{
//          return res.status(200).json({
//                   message :"I am comming from backend",
//                   success:true
//          })
// })

// middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
         origin:'http://localhost:5173',
         credentials:true
}
app.use(cors(corsOptions));

// yaha api aa rhi hain 

app.use("/api/v1/user" , userRoute);
app.use("/api/v1/post" , postRoute);
app.use("/api/v1/message" , messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,"fronend" ,"dist","index.html"))
})



// "http://localhost:8000/api/v1/user/register"


server.listen(PORT,()=> {
         connectDb();
         console.log(`Server listen at port ${PORT}`);
})



// password -> 37ZyuyfQ7UeUbanB
//connect string -> mongodb+srv://kamalpandey:<db_password>@cluster0.7cfbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0