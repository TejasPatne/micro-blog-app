import bcryptjs from 'bcryptjs';
import { User } from '../models/index.js';
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.send('Hello from New User');
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(403, "You can update only your account!"));
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            },
            {new: true}
        );
    
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err)
    }
}