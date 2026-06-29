import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userModel } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const login =
  async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    const user =
      await userModel.findOne({
        email,
      });

    if (!user)
      return res
        .status(404)
        .json({
          message:
            "User not found",
        });

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match)
      return res
        .status(400)
        .json({
          message:
            "Invalid credentials",
        });

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

    res.json({
      token,
    });
  };
