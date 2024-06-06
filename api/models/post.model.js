import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        maxlength: 140
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

export const Post = mongoose.model('Post', postSchema);