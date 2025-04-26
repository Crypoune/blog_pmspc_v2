import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";

import session from "express-session";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

import router from "./router/index.routes.js";
import pool from "./config/db.js";

const app = express();

const PORT = process.env.LOCAL_PORT;

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use(
	session({
		secret: process.env.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 24h
			httpOnly: true,
			secure: false,
		},
		store: new MySQLStore({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
		}),
	})
);

app.use("/img", express.static(path.join(process.cwd(), "public/img")));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// middleware pour afficher le nombre de sessions actives et la session de l'utilisateur effectuant la requête
// A SUPPRIMER EN PRODUCTION
app.use(async (req, res, next) => {
 	try {
 		const [[result]] = await pool.query(
 			"SELECT COUNT(session_id) AS session FROM sessions"
 		);
 		next();
 	} catch (err) {
    next();
 	}
});

app.use(["/back/v1", "/"], router);

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  next();
});

app.listen(PORT, () =>
	console.log(`Server is running at http://localhost:${PORT}`)
);
