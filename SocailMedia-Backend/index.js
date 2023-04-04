/** @format */

import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();

import connectWithDb from "./config/db.js";
connectWithDb()
  .then(() => console.log("DB Connected ..."))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Listening to the server at Port : " + process.env.PORT);
    })
  )
  .catch((error) => {
    console.log("DB Connection Issue");
    console.log(error);
    process.exit(1);
  });
