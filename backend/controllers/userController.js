import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'L50c2VEbPHBImnWIcKHF7Lpg5a7hVZTvEVXdTA3ojmRpe0QOt_tph4IDYxvQ0u3-j1RQ9Z01Y-etRPCaTPAvpg';

// Transporter for sending emails (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'microbyte107@gmail.com', // Your email
    pass: 'hammadMB2170', // Your email password
  },
});

export const registerUser = async (req, res) => {
  const { firstName, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { firstName, email } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user: { firstName: user.firstName, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // Generate a 6-digit PIN code
    const resetPin = Math.floor(100000 + Math.random() * 900000).toString();
    const resetPinExpiry = Date.now() + 3600000; // 1 hour from now

    // Save the PIN and expiry time in the user document
    user.resetPasswordPin = resetPin;
    user.resetPasswordPinExpiry = resetPinExpiry;
    await user.save();

    // Send the PIN to the user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset PIN',
      text: `You requested a password reset. Please use the following PIN to reset your password: ${resetPin}`,
    });

    res.status(200).json({ message: 'Password reset PIN sent to your email' });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const resetPassword = async (req, res) => {
  const { email, resetPin, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({
      email,
      resetPasswordPin: resetPin,
      resetPasswordPinExpiry: { $gt: Date.now() }, // Ensure the PIN hasn't expired
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired PIN.' });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordPin = undefined;
    user.resetPasswordPinExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
