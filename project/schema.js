import mongoose from "mongoose";

export const gameSchema = new mongoose.Schema({
    _id: String,
    gameName: { type: String, required: true },
    description: String,
},
{ collection: "games" });

export const reviewSchema = new mongoose.Schema({
    _id: String,
    userID: { type: String, required: true },
    gameID: { type: String, required: true },
    date: { type: Date, required: true },
    title: String,
    content: String,
},
{ collection: "reviews" });

export const userSchema = new mongoose.Schema({
    _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    dob: Date,
    role: {
        type: String,
        enum: ["NORMAL", "ADMIN"],
        default: "NORMAL"
    },
    description: String,
    following: {
        type: [String],
        default: []
    },
},
{ collection: "users" });

