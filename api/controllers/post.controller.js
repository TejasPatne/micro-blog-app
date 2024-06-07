import { Post } from "../models/index.js";

export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        await post.populate('user', 'username profilePicture bookmarks');
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const posts = await Post.find()
                                .sort({ createdAt: -1 })
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .populate(
                                    {
                                        path: 'user',
                                        select: 'username profilePicture bookmarks' // specify which fields to include
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
            res.status(200).json(req.params.id);
        } else {
            return next(errorHandler(403, "You can only delete your own posts!"));
        }
    } catch (err) {
        next(err);
    }
}

export const likePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post.likes.includes(req.user.id)) {
            const updatedPost = await Post.findByIdAndUpdate(id, { $push: { likes: req.user.id } }, { new: true });
            res.status(200).json(updatedPost);
        } else {
            const updatedPost = await Post.findByIdAndUpdate(id, { $pull: { likes: req.user.id } }, { new: true });
            res.status(200).json(updatedPost);
        }
    } catch (err) {
        next(err);
    }
}