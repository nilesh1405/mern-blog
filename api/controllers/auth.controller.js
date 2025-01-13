import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
export const signup = async (req , res , next)=>{
    const user = req.body;
    if(!user.password || !user.username || !user.email || user.password=='' || user.username=='' || user.email==''){
        next(errorHandler(400,'All fields are required'));
    }
    const hashedPassword = bcrypt.hashSync(user.password,10);
    const newUser = new User({
        username:user.username,
        email:user.email,
        password:hashedPassword,
    })

    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        next(error);
    }
}
export const signin = async(req,res,next)=>{
    const {email , password} = req.body;
    if(!password || !email || password=='' || email==''){
        next(errorHandler(400,'All fields are required'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User Not Found'));
        }
        const validPassword = bcrypt.compareSync(password , validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password'));
        }
        
        const token = jwt.sign(
                {
                    id:validUser._id,
                    username:validUser.username
                },
                process.env.JWT_SECRET
               
        );
        const { password:pass , ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true}).json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async(req,res,next)=>{
    const {email , name , gogglePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
            const { password:pass , ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true}).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                password:hashedPassword,
                email:email,
                profilePicture:gogglePhotoUrl
            });
            await newUser.save();
            const token= jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const { password:pass , ...rest} = newUser._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true}).json(rest);
        }
    }catch(error){
        next(error);
    }
    
}