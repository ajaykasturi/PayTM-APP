const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email().toLowerCase(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});
const signinSchema = zod.object({
  username: zod.string().email().toLowerCase(),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  const validator = signupSchema.safeParse(req.body);
  if (!validator.success) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }

  const existingUser = await findOne({ username: validator.data.username });

  if (existingUser) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }

  const user = await User.create(validator.data);
  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({ message: "User created successfully", token });
});

router.post("/signin", async (req, res) => {
  const validator = signinSchema.safeParse(req.body);
  if (!validator.success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const user = await User.findOne(validator.data);
  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.status(200).json({ token });
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports = router;
