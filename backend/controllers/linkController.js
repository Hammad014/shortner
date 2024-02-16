
import LinkModel from '../models/LinkModel.js';
import { nanoid } from 'nanoid';
import { URL } from 'url';

export const shortenLink = async (req, res) => {
  const { originalUrl } = req.body;

  try {
    const parsedUrl = new URL(originalUrl);
    if (!parsedUrl.host || !parsedUrl.pathname) {
      return res.status(400).json({ error: 'Invalid URL format. Please provide a valid URL including the protocol (https:// or http://) and domain extension.' });
    }

    const existingLink = await LinkModel.findOne({ originalUrl });
    if (existingLink) {
      existingLink.clicks += 1;
      await existingLink.save();
  
      return res.json({ shortUrl: existingLink.shortUrl });
    }

    const shortUrl = nanoid(8);
    const newLink = new LinkModel({
      originalUrl,
      shortUrl: `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`,
    });

    await newLink.save();

    res.json({ shortUrl: newLink.shortUrl });
  } catch (error) {
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

export const trackLinkClick = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const link = await LinkModel.findOne({ shortUrl });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Increment clicks count for the link
    link.clicks += 1;
    await link.save();

    // Return the original URL for redirection
    res.json({ originalUrl: link.originalUrl });
  } catch (error) {
    console.error('Error tracking link click:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
