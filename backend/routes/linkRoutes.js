import express from 'express';
import { shortenLink, getLinks, trackLinkClick } from '../controllers/LinkController.js';

const router = express.Router();

router.post('/shorten', shortenLink);
router.get('/all', getLinks);
router.get('/:shortUrl', trackLinkClick); 

export default router;
