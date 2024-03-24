const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
app.get("/", (req, res) => {
  res.json({ message: "paytm backend server running" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
