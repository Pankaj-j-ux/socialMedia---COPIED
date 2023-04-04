/** @format */

import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import ExtraRoute from "./Routes/ExtraRoute.js";

//Middleware

const corsConfig = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsConfig));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "HELLO d",
  });
});

//Routes Middleware
app.use("/api/v1", AuthRoute);
app.use("/api/v1", UserRoute);
app.use("/api/v1", PostRoute);
app.use("/api/v1", ExtraRoute);

export default app;
