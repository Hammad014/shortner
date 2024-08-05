import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LinkModel from './models/LinkModel.js'; // Ensure the correct path

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const dbUrl = 'mongodb+srv://hammad:hammadMDB2172@nextproject.dnj1h9q.mongodb.net/?retryWrites=true&w=majority' ;

mongoose.connect(dbUrl)
  .then(() => console.log("Database Connected"))
  .catch(error => console.error("Error connecting to database:", error));

  if (!dbUrl) {
    console.error("No MongoDB URI defined in .env");
    process.exit(1);
  }

app.use(cors());
app.use(bodyParser.json());

// Generate a short code
function generateShortCode(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return Math.abs(hash).toString(36);
}

// POST endpoint to create a short URL
app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = generateShortCode(originalUrl);
  const shortUrl = `http://localhost:${port}/${shortCode}`;  // Full short URL

  try {
    let link = await LinkModel.findOne({ shortUrl });
    if (!link) {
      link = new LinkModel({ originalUrl, shortUrl: shortCode, fullShortUrl: shortUrl });
      await link.save();
    }
    res.json({ shortUrl: shortUrl });
  } catch (error) {
    console.error('Database operation failed', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to redirect to the original URL and increment clicks
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const link = await LinkModel.findOneAndUpdate(
      { shortUrl: shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (link) {
      res.redirect(link.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error('Error retrieving link:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE endpoint to remove a short URL
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const result = await LinkModel.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Link deleted successfully' });
    } else {
      res.status(404).json({ message: 'Link not found' });
    }
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/links', async (req, res) => {
  try {
    const links = await LinkModel.find({});
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error fetching links:', error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// const app = express();
// const port = 5000;

// // console.log("Frontend URL loaded:", process.env.FRONTEND_URL);

// const dbUrl = process.env.MONGODB_URI ;

// mongoose.connect(dbUrl)
//   .then(() => console.log("Database Connected"))
//   .catch(error => console.error("Error connecting to database:", error));

//   if (!dbUrl) {
//     console.error("No MongoDB URI defined in .env");
//     process.exit(1);
//   }

// app.use(cors());
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/link', linkRoutes);
// app.use('/api/user', userRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
