import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        maxlength: 140
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

export const Post = mongoose.model('Post', postSchema);