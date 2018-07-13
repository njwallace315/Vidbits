const Video = require('../models/video.js');
const {jsdom} = require('jsdom');


// Create and return a sample Item object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const videoUrl = options.videoUrl || 'https://youtu.be/4WgT9gy4zQA';
  const description = options.description || 'I could sing it by heart';
  return {title, videoUrl, description};
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// Add a sample Item object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};


module.exports = {
  buildVideoObject,
  parseTextFromHTML,
  seedVideoToDatabase,
};
