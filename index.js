const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
require("dotenv").config();

const routes = require("./src/Routes");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", routes);

app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: `Hello, I'm Express JS`,
  });
});

app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
