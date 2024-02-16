import LinkModel from '../models/LinkModel';
import { nanoid } from 'nanoid';
import { URL } from 'url'; // For URL parsing and validation

export const shortenLink = async (req, res) => {
  const { originalUrl } = req.body;

  try {
    // Validate and parse the input URL:
    const parsedUrl = new URL(originalUrl);
    if (!parsedUrl.host || !parsedUrl.pathname) {
      return res.status(400).json({ error: 'Invalid URL format. Please provide a valid URL including the protocol (https:// or http://) and domain extension.' });
    }

    // Check if the link already exists (optional):
    const existingLink = await LinkModel.findOne({ originalUrl });
    if (existingLink) {
      return res.json({ shortUrl: existingLink.shortUrl });
    }

    // Create a unique, well-formatted short URL:
    const shortUrl = nanoid(8);
    const newLink = new LinkModel({
      originalUrl,
      shortUrl: `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`,
    });

    await newLink.save();

    res.json({ shortUrl: newLink.shortUrl });
  } catch (error) {
    // Handle errors gracefully:
    console.error('Error shortening link:', error);
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(409).json({ error: 'Duplicate URL already exists. Please try a different URL.' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await LinkModel.find();
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
