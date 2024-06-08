import { Comment, Post } from "../models/index.js";

export const getCommentsOnPost = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const postId = req.params.id;
  try {
    const comments = await Comment.find({ post: postId })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "username profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.body.user,
    });
    console.log(comment);
    await comment.populate("user", "username profilePicture");
    await Post.findByIdAndUpdate(req.body.post, {
      $push: { comments: comment._id },
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};
