import dotenv from 'dotenv'
import express from 'express' 
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config()
import { UserRouter } from './routes/user.js';
import {projectRoutes} from './routes/project.js';

const app=express();
app.use(cors({origin:"http://localhost:5173",
    credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', UserRouter);
app.use('/api/projects', projectRoutes);

mongoose.connect(process.env.MONGODB_URL+'authentication')
app.listen(process.env.PORT,()=>{
    console.log("Server is running ")
});

