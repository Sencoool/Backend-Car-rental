require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5500;

app.get("/", (rep, res) => {
  res.send("Hello world! wow Check Nodemon!!!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
