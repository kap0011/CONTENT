const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
app.use(cors());

require("./db/mongoose");

const userRouter = require("./routes/user.routes");
const feedRouter = require("./routes/feed.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(feedRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started at port", process.env.PORT);
});
