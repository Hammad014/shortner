import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import LinkModel from './models/LinkModel.js';
import UserGeneratedLinks from './models/UserGeneratedLinks.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const dbUrl = process.env.MONGODB_URI;

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
    let link = await LinkModel.findOne({ shortUrl});
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


app.post('/api/shorten/user', async (req, res) => {
  const { originalUrl, email } = req.body;
  const shortCode = generateShortCode(originalUrl);
  const shortUrl = `http://localhost:${port}/${shortCode}`;  // Full short URL

  try {
    let user = await UserGeneratedLinks.findOne({ email });

    if (!user) {
      user = new UserGeneratedLinks({ email, links: [] });
    }

    const existingLink = user.links.find(link => link.shortUrl === shortCode);

    if (!existingLink) {
      user.links.push({
        originalUrl,
        shortUrl: shortCode,
        fullShortUrl: shortUrl
      });
      await user.save();
    }

    res.json({ shortUrl: shortUrl });
  } catch (error) {
    console.error('Database operation failed', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/links/user', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const user = await UserGeneratedLinks.findOne({ email: userEmail });

    if (user) {
      res.json(user.links);
    } else {
      res.status(404).json({ message: 'No links found for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error fetching links:', error);
  }
});



// GET endpoint to redirect to the original URL and increment clicks
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    // First, try to find the link in the LinkModel schema
    let link = await LinkModel.findOneAndUpdate(
      { shortUrl: shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    // If the link is not found in LinkModel, try finding it in UserGeneratedLinks
    if (!link) {
      const user = await UserGeneratedLinks.findOne({ 'links.shortUrl': shortCode });
      if (user) {
        link = user.links.find(link => link.shortUrl === shortCode);

        // Increment the clicks for the specific link in UserGeneratedLinks
        if (link) {
          link.clicks += 1;
          await user.save();
        }
      }
    }

    // Redirect if the link was found, otherwise send a 404 response
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
    const userEmail = req.query.email;
    const linkId = req.params.id;

    // Find the user by email and update the user's link array
    const user = await UserGeneratedLinks.findOneAndUpdate(
      { email: userEmail },
      { $pull: { links: { _id: linkId } } }, // Remove the link with the specified ID
      { new: true } // Return the updated document
    );

    if (user) {
      res.status(200).json({ message: 'Link deleted successfully' });
    } else {
      res.status(404).json({ message: 'Link not found or user not authenticated' });
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



// app.get('/api/links', async (req, res) => {
//   const userId = req.user._id; // This should be set by your authentication middleware
//   try {
//     const links = await LinkModel.find({ userId: userId });
//     res.json(links);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//     console.error('Error fetching links:', error);
//   }
// });


app.use('/api/user', userRoutes);

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
