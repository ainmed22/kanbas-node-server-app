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
    
    app.post("/api/project/reviews", (req, res) => {
        const review = { ...req.body, _id: new Date().getTime().toString() };
        Database.project_reviews.push(review);
        res.send(review);
    });
    
    app.get("/api/project/users", (req, res) => {
        const users = Database.project_users;
        res.send(users);
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
    
    app.post("/api/project/reviews", (req, res) => {
        const review = { ...req.body, _id: new Date().getTime().toString() };
        Database.project_reviews.push(review);
        res.send(review);
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
    
    /*
    {
        "_id": "7238",
        "userID": "111",
        "gameID": "41494",
        "date": "2022-07-11",
        "title": "Cyberpunk 2077: A Futuristic Dystopia",
        "content": "Cyberpunk 2077 offers an intriguing world, but it's plagued by technical issues. The story has potential, but it's often overshadowed by the problems."
    },
    */
    
    /*
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((c) => c._id === id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.send(course);
    });
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        console.log(id);
        console.log("whatsat");
        console.log(course);
        Database.courses = Database.courses.map((c) =>
            c._id === id ? { ...course } : c
        );
        res.sendStatus(204);
    });
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body, _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
    */
}
export default ProjectRoutes;