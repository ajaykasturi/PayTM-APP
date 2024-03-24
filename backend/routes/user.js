const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();
const { authMiddleware } = require("../middleware");
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

  const existingUser = await User.findOne({
    username: validator.data.username,
  });

  if (existingUser) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }

  const user = await User.create(validator.data);
  const userId = user._id;
  //------
  //create bank acount
  await Account.create({
    userId,
    balance: parseInt(100 + Math.random() * (1000 - 100)),
  });
  //------
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
const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(6).optional(),
});
router.put("/", authMiddleware, async (req, res) => {
  const validator = updateSchema.safeParse(req.body);

  if (!validator.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, validator.data);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });
  res.status(200).json({
    users: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      id: user._id,
    })),
  });
});

module.exports = router;
