import { Post } from "../models/index.js";

export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json("Post created successfully");
    } catch (err) {
        next(err);
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const posts = await Post.find()
                                .sort({ createdAt: -1 })
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .populate(
                                    {
                                        path: 'user',
                                        select: 'username profilePicture' // specify which fields to include
                                    }
                                )
                                .exec();
        console.log(page, limit)
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}