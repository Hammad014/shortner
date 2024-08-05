// userController.js

import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      firstName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.',
    user: {
      firstName: user.firstName,
      email: user.email,
    }
  });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    // Send the complete user information in the response
    res.status(200).json({
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        email: user.email,
        // Add other user properties if needed
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
