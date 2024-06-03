import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://pbs.twimg.com/profile_images/1705186839584194560/9YD29Lmg_200x200.jpg"
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

export const User = mongoose.model('User', userSchema);