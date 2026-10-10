const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, ageGroup } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ageGroup,
    });

    res.status(201).json({
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        ageGroup: user.ageGroup,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        ageGroup: user.ageGroup,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  me,
};
