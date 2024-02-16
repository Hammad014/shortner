import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import linkRoutes from './routes/linkRoutes.js';

const app = express();
const port = 5000;

const url = "mongodb+srv://hammad:hammadMDB2172@nextproject.dnj1h9q.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(error => console.error("Error connecting to database:", error));

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/link', linkRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
