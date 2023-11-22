import * as dao from "./dao.js";
// let currentUser = null;

function NewProjectRoutes(app) {
    
    const findAllGames = async (req, res) => {
        const games = await dao.findAllGames();
        res.json(games);
    }
    
    app.get("/api/project/games", findAllGames);
    
    const findAllReviews = async (req, res) => {
        const reviews = await dao.findAllReviews();
        res.json(reviews);
    }
    
    app.get("/api/project/reviews", findAllReviews);
    
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    }

    app.get("/api/project/users", findAllUsers);
    
    const createReview = async (req, res) => {
        const result = { ...req.body, _id: new Date().getTime().toString() };
        const review = await dao.createReview(result);
        res.json(review);
    }
    
    app.post("/api/project/reviews", createReview);
    
    const updateUser = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateUser(id, req.body);
        res.json(status);
    }
    
    app.put("/api/project/users/:id", updateUser);
    
    const followUser = async (req, res) => {
        const { id } = req.params;
        const status = await dao.followUser(req.body['_id'], id);
        res.json(status);
    }
    
    app.put("/api/project/users/:id/follow", followUser);
    
    const unfollowUser = async (req, res) => {
        const { id } = req.params;
        const status = await dao.unfollowUser(req.body['_id'], id);
        res.json(status);
    }
    
    app.put("/api/project/users/:id/unfollow", unfollowUser);
    
    const updateReview = async (req, res) => {
        const status = await dao.updateReview(req.body['_id'], req.body);
        res.json(status);
    }
    
    app.put("/api/project/reviews", updateReview);
    
    const deleteReview = async (req, res) => {
        const { id } = req.params;
        const status = await dao.deleteReview(id);
        res.json(status);
    }
    
    app.delete("/api/project/reviews/:id", deleteReview);
    
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        const result = { ...req.body, _id: new Date().getTime().toString() };
        const currentUser = await dao.createUser(result);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    
    app.post("/api/project/users/signup", signup);

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    
    app.post("/api/project/users/signin", signin);
     
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    
    app.post("/api/project/users/signout", signout);
    
    const account = async (req, res) => {
        var currentUser = req.session['currentUser'];

        if (currentUser) {
            currentUser = await dao.findUserByID(currentUser['_id']);
            req.session['currentUser'] = currentUser;
        }

        res.json(currentUser);
    };

    app.post("/api/project/users/account", account);
    
    /*
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);  
        req.session['currentUser'] = currentUser;        
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
        
        const setCookieHeader = res.get('Set-Cookie');
        console.log('Set-Cookie Header:', setCookieHeader);
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
    */
    
}

export default NewProjectRoutes;