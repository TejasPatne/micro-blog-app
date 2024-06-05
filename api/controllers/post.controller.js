import { Post } from "../models/index.js";

export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({ message: "Post created successfully", post });
    } catch (err) {
        next(err);
    }
}