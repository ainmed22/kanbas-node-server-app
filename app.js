import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://transcendent-kringle-19545c.netlify.app/",
    "https://transcendent-kringle-19545c.netlify.app/",
    "http://localhost:3000/",
    "http://localhost:4000/"
]

app.use(
    cors({
        credentials: true,
        origin: allowedOrigins
    })
);

app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);