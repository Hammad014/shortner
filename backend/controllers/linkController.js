// // linkController.js

import LinkModel from '../models/LinkModel.js';
import { nanoid } from 'nanoid';
import { URL } from 'url';

// Function to retrieve the original URL based on the short URL
const getOriginalUrl = async (shortUrl) => {
  try {
    const link = await LinkModel.findOne({ shortUrl });

    if (link) {
      return link.originalUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting original URL:', error);
    throw error;
  }
};

// Function to shorten a link
function generateShortCode(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Function to shorten a link
export const shortenLink = async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = 'http://localhost:5000'; // Ensure the BASE URL is correct

  try {
    const parsedUrl = new URL(originalUrl);
    if (!parsedUrl.host || !parsedUrl.pathname) {
      return res.status(400).json({ error: 'Invalid URL format. Please provide a valid URL including the protocol (https:// or http://) and domain extension.' });
    }

    let shortCode = generateShortCode(originalUrl);
    let existingLink = await LinkModel.findOne({ shortUrl: shortCode });

    if (existingLink) {
      return res.json({ shortUrl: `${baseUrl}/${existingLink.shortUrl}` });
    }

    existingLink = new LinkModel({ originalUrl, shortUrl: shortCode });
    await existingLink.save();
    res.json({ shortUrl: `${baseUrl}/${shortCode}` });
  } catch (error) {
    console.error('Error shortening link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteLink = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedLink = await LinkModel.findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all links
export const getLinks = async (req, res) => {
  try {
    const links = await LinkModel.find();
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to track link click
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

    // Respond with both short and full URLs
    res.json({ shortUrl: `${link.shortUrl}`, fullUrl: `${link.originalUrl}` });
  } catch (error) {
    console.error('Error tracking link click:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get link shortening data for the graph
export const getLinkShorteningChartData = async (req, res) => {
  try {
    const linkShorteningData = await LinkModel.find({}, { date: 1, clicks: 1, _id: 0 }).sort({ date: 1 });
    res.json(linkShorteningData);
  } catch (error) {
    console.error('Error fetching link shortening data for the graph:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to redirect to the original URL
export const redirectToOriginalUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const link = await LinkModel.findOne({ shortUrl });
    if (link) {
      return res.redirect(link.originalUrl);
    } else {
      return res.status(404).send('Link not found');
    }
  } catch (error) {
    console.error('Error redirecting to original URL:', error);
    return res.status(500).send('Internal Server Error');
  }
};

