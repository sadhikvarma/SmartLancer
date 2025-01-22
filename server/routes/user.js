import express from 'express'
import bcryt from 'bcrypt'
import bcrypt from 'bcrypt'
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const router =express.Router();

router.post('/signup',async (req,res) =>{
    const {username,email,password}=req.body;
    const user=await User.findOne({email});
    if(user){
        return res.json({message:'Email already exists'});
    }
    const hashedPassword=await bcryt.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })
    await newUser.save()
    return res.json({status: true,message:"record registered"})
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({message:'Email does not exist please check once again'});
    }
    const validPassword=await bcryt.compare(password,user.password);
    if(!validPassword){
        return res.json({message:'Invalid password'});
    }

    const token=jwt.sign({username:user.username},process.env.KEY,{expiresIn:'2000m'})
    res.cookie('token',token,{httpOnly:true,maxAge:360000})
    return res.json({status:true,message:"login successfully"})
})

router.post('/forgot-password',async (req,res)=>{
    const {email}=req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.json({message:'Email does not exist please check once again'});
        }
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '20m' });

        const resetLink = `http://localhost:5173/resetpassword/${token}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.email,
              pass: process.env.passkey
            }
          });
          
          var mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'Reset password',
            text: `You requested a password reset. Click the link to reset your password: ${resetLink}`
          };
          
          await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.json({message:"error sending email"})
            } else {
              return res.json({status:true,message:'"email sent'})
            }
          });

    } catch (error) {
        console.log(error)
    }
})


// POST route to handle the password reset
router.post('/resetpassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ status: false, message: "Password is required" });
  }

  try {
    console.log("backend try block");
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    const hashPassword = await bcrypt.hash(password, 10); 
    await User.findByIdAndUpdate(id, { password: hashPassword });

    return res.status(200).json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during token verification as it is expired", error);
    return res.status(400).json({ status: false, message: "Invalid token or user" });
  }
});

const verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "Please login to access this resource" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
     
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
}


router.get('/verify',verifyuser, (req,res) => {
  return res.json({status:true,message:"authorized"})

});
router.get('/logout',(req,res) =>{
  res.clearCookie('token');
  return res.json({status:true})
})

export {router as UserRouter}