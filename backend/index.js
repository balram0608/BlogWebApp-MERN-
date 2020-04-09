let middleware = require("./middleware");
const express = require("express");
const app = express();

const PORT = process.env.Port || 5000;

const mongoose = require("mongoose");

//database connection
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () =>
  console.log("mongoDB connection eastablished succesfully")
);

//middleware
app.use(express.json());
//routes
const userroute = require("./routes/user/user");
app.use("/user", userroute);
//acknoledge api
app.get("/", middleware.checkToken, (req, res) =>
  res.json({ message: "Welcome you are in the main page :)" })
);

app.listen(PORT, () =>
  console.log(`your app is running on port ${PORT} enjoy developing`)
);