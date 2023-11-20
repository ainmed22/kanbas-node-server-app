import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });
// export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const updateUser = async (userId, user) => {
    console.log("updateUser");
    console.log(userId);
    console.log(user);

    // const result = await model.updateOne({ _id: userId }, { $set: user });
    // const result = await model.findOne({ _id: userId });
    // const result = await model.updateOne({ _id: userId });
    // const result = await model.updateOne({ username: 'ada' }, { $set: user });
    
    delete user._id;

    // const result = await model.updateOne({ _id: userId }, { $set: user });
    
    const result = await model.updateOne(
        { _id: '65580756fed6bb3b501c55f2' },
        { $set: { username: 'ada2' } }
    );
    
    console.log(result);
}

export const deleteUser = (userId) => model.deleteOne({ _id: userId });