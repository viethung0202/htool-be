const express = require('express');
const Video = require('./models/Video');

const router = express.Router();

router.get('/', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

router.post('/', async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
});

module.exports = router;
