const mongoose = require("mongoose");
require("dotenv").config();
//connect to mongodb cluster
mongoose.connect(process.env.DATABASE_URL);

// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unqiue: true,
    required: true,
  },
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  password: { type: String, required: true, minLength: 6 },
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
