const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
