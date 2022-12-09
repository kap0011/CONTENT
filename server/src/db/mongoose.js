const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODN_URL;

//Connect MongoDB
mongoose.connect(process.env.MONGODN_URL).then(() => {
  console.log("Connected to Databse");
}).catch(error =>
  console.log(error)
);
