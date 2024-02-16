import express from 'express';
import { shortenLink, getLinks } from '../controllers/LinkController.js';

const router = express.Router();

router.post('/shorten', shortenLink);
router.get('/all', getLinks);

export default router;
