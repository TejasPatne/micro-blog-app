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
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user.toString() === req.user.id) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post deleted successfully");
        } else {
            return next(errorHandler(403, "You can only delete your own posts!"));
        }
    } catch (err) {
        next(err);
    }
}

export const likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) {
            await post.updateOne({ $push: { likes: req.user.id } });
            res.status(200).json("Post liked successfully");
        } else {
            await post.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json("Post disliked successfully");
        }
    } catch (err) {
        next(err);
    }
}