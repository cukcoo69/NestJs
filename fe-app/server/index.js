const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/*", (req, res) => {
  let indexPath = path.join(__dirname, '../build/index.html')
  res.sendFile(indexPath);
});

app.listen(3001);
