/** @format */

import mongoose from "mongoose";

const connectWithDb = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // .then(console.log("DB Connected ..."))
  // .catch((err) => {
  //   console.log("DB Connection Issue");
  //   console.log(err);
  //   process.exit(1);
  // });
};

export default connectWithDb;
