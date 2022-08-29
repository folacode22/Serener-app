require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();
const connectDB = require("./config/db");
//import
const userRoutes = require("./routes/user_routes");
const itemRoutes = require("./routes/item_routes");
connectDB();
const port = process.env.PORT || 6550;
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.get("/", (req, res) => {
  res.send("home page");
});

//custom middleware
app.use("/api", userRoutes);
app.use("/api", itemRoutes);
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
