const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const cors = require("cors");
const app = express();

//Middleware

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/", routes);

//Database connection

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1/DNS")
  .then(() => {
    app.listen(5000);
    console.log("Database Connected!! Listening to port 5000");
  })
  .catch((err) => console.log(err));
