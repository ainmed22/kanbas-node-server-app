import { gameModel, reviewModel, userModel } from "./model.js";

export const findAllGames = () => gameModel.find({}, '_id gameName description');

export const findAllReviews = () => reviewModel.find({}, '_id userID gameID date title content');

export const findAllUsers = () => userModel.find({}, '_id username password email dob role description following');

export const createReview = (review) => reviewModel.create(review);

export const updateUser = (userId, user) => userModel.updateOne({ _id: userId }, { $set: user });

export const followUser = (followerID, followingID) => {
    return userModel.updateOne(
        { _id: followerID },
        { $push: { following: followingID } }
    );
};

export const unfollowUser = (followerID, followingID) => {
    return userModel.updateOne(
        { _id: followerID },
        { $pull: { following: followingID } }
    );
};

export const updateReview = (reviewId, review) => reviewModel.updateOne({ _id: reviewId }, { $set: review });

export const deleteReview = (reviewId) => reviewModel.deleteOne({ _id: reviewId });

export const createUser = (user) => userModel.create(user);
export const findUserByUsername = (username) => userModel.findOne({ username: username });
export const findUserByCredentials = (usr, pass) => userModel.findOne({ username: usr, password: pass });
export const findUserByID = (id) => userModel.findOne({ _id: id });

/*
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
*/