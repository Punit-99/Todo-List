// Server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const todoRoute = require("./routes/todoRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middle ware=> static file
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// mongoDB connection
mongoose
  .connect(process.env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

//Routes
app.use("/", todoRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://127.0.0.1:${PORT}`);
});
