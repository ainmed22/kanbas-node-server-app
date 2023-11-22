import mongoose from "mongoose";
import { gameSchema, reviewSchema, userSchema } from "./schema.js";

export const gameModel = mongoose.model("games", gameSchema);
export const reviewModel = mongoose.model("reviews", reviewSchema);
export const userModel = mongoose.model("users", userSchema);