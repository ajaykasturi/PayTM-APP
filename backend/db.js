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
const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
