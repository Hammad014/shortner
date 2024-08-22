// backend/routes/verifyToken.js
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export default router;
