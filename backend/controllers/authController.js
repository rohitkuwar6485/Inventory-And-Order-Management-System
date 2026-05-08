import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  try {

    //Step 1: Get user details from request body
    const { name, email, password } = req.body;

    // Step 2: Check if user exists?
    const existingUser = await User.findOne({ email });

    // Step 3: If user exists, return error
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Step 6: Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Login user
export const loginUser = async (req, res) => {
  try {

    // Step 1: Get email and password from request body
    const { email, password } = req.body;

    // Step 2: Check user
    const user = await User.findOne({ email });

    // Step 3: If user not found, return error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Step 4: Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // Step 5: If password does not match, return error
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Step 6: Generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    // Step 7: Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};