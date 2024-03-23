const mongoose = require("mongoose");

//connect to mongodb cluster
mongoose.connect(
  "mongodb+srv://ajay:08062001@cluster0.d3g2vlq.mongodb.net/paytm/"
);

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
