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

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(403, "Please login to delete your account!"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Your account has been deleted!");
    } catch (err) {
        next(err)
    }
}

export const bookmarkPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id);
        if (!user.bookmarks.includes(id)) {
            const updatedUserInfo = await User.findByIdAndUpdate(req.user.id, { $push: { bookmarks: id } }, { new: true });
            res.status(200).json(updatedUserInfo);
        } else {
            const updatedUserInfo = await User.findByIdAndUpdate(req.user.id, { $pull: { bookmarks: id } }, { new: true });
            res.status(200).json(updatedUserInfo);
        }
    } catch (err) {
        next(err);
    }
}