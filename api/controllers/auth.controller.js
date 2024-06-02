import { User } from "../models/index.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (err) {
        next(err);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    
    try {
        
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        // jwt access_token that expires in 1 day
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // send access_token in cookie that also expires in 1 day
        res
        .cookie("access_token", token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json(validUser);

    } catch (err) {
        next(err);
    }
}