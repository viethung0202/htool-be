const videoService = require('../services/videoService');

async function list(req, res) {
  const videos = await videoService.listVideos();
  res.json(videos);
}

async function create(req, res) {
  const video = await videoService.createVideo(req.body);
  res.status(201).json(video);
}

module.exports = { list, create };
