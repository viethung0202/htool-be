const Video = require('../models/Video');

async function listVideos() {
  return Video.find();
}

async function createVideo(data) {
  return Video.create(data);
}

module.exports = { listVideos, createVideo };
