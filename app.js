import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import ProjectRoutes from "./projectroutes.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
const CONNECTION_ADDENDUM = "kanbas?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING + CONNECTION_ADDENDUM);

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://transcendent-kringle-19545c.netlify.app",
    "https://transcendent-kringle-19545c.netlify.app",
    
    "http://a1--transcendent-kringle-19545c.netlify.app",
    "https://a1--transcendent-kringle-19545c.netlify.app",
    
    "http://a2--transcendent-kringle-19545c.netlify.app",
    "https://a2--transcendent-kringle-19545c.netlify.app",
    
    "http://a3--transcendent-kringle-19545c.netlify.app",
    "https://a3--transcendent-kringle-19545c.netlify.app",
    
    "http://a4--transcendent-kringle-19545c.netlify.app",
    "https://a4--transcendent-kringle-19545c.netlify.app",
    
    "http://a5--transcendent-kringle-19545c.netlify.app",
    "https://a5--transcendent-kringle-19545c.netlify.app",
    
    "http://a6--transcendent-kringle-19545c.netlify.app",
    "https://a6--transcendent-kringle-19545c.netlify.app",
    
    "http://project--transcendent-kringle-19545c.netlify.app",
    "https://project--transcendent-kringle-19545c.netlify.app",
    
    "http://localhost:3000",
    "https://localhost:3000"
]

app.use(
    cors({
        credentials: true,
        origin: allowedOrigins
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "None",
        secure: true,
    },
};

/*
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
*/

app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
ProjectRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);