import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        maxlength: 140
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
        }
    },
    timestamps: true
});

export const Comment = mongoose.model('Comment', commentSchema)