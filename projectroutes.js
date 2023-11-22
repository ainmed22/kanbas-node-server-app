import Database from "./Database/index.js";

function ProjectRoutes(app) {
    
    app.get("/api/project/games", (req, res) => {
        const games = Database.project_games;
        res.send(games);
    });
    
    app.get("/api/project/reviews", (req, res) => {
        const reviews = Database.project_reviews;
        res.send(reviews);
    });
    
    app.get("/api/project/users", (req, res) => {
        const users = Database.project_users;
        res.send(users);
    });
    
    app.post("/api/project/reviews", (req, res) => {
        const review = { ...req.body, _id: new Date().getTime().toString() };
        Database.project_reviews.push(review);
        res.send(review);
    });
    
    app.put("/api/project/users/:id", (req, res) => {
        const { id } = req.params;
        const user = req.body;

        Database.project_users = Database.project_users.map((u) =>
            u._id === id ? { ...user } : u
        );
        res.sendStatus(204);
    });
    
    app.put("/api/project/users/:id/follow", (req, res) => {
        const { id } = req.params;
        const follower = req.body;
        
        Database.project_users = Database.project_users.map((u) =>
            u._id === follower._id ? { ...u, following: u.following.concat(id) } : u
        );
        res.sendStatus(204);
    });
    
    app.put("/api/project/users/:id/unfollow", (req, res) => {
        const { id } = req.params;
        const follower = req.body;
        
        Database.project_users = Database.project_users.map((u) =>
            u._id === follower._id ? { ...u, following: u.following.filter((userId) => userId !== id) } : u
        );
        res.sendStatus(204);
    });
    
    app.put("/api/project/reviews", (req, res) => {
        const review = req.body;
        Database.project_reviews = Database.project_reviews.map((r) =>
            r._id === review._id ? review : r
        );
        res.sendStatus(204);
    });
    
    app.delete("/api/project/reviews/:id", (req, res) => {
        const { id } = req.params;
        Database.project_reviews = Database.project_reviews.filter((r) => r._id !== id);
        res.sendStatus(204);
    });
    
}
export default ProjectRoutes;