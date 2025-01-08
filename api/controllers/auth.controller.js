import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
export const signup = async (req,res)=>{
    const user = req.body;
    if(!user.password || !user.username || !user.email || user.password=='' || user.username=='' || user.email==''){
        return res.status(400).json({message:'All fields are required'});
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
        res.status(409).json({message:error.message});
    }
}