const axios = require('axios');
require('dotenv').config();

class YouTubeVideo {
  constructor(videoId) {
    this.videoId = videoId;
    this.title = null;
    this.description = null;
    this.channelName = null;
    this.article = null;
  }

  // This method is used to call the Youtube api using a videoId and Youtube data api v3 key which 
  // I have placed in the .env file
  async fetchDetails() {

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
    console.log('Fetching video details for ID:', this.videoId); // making sure that the video id is define

    try {
      const response = await axios.get(detailsUrl);

      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      const videoData = response.data.items[0];
      this.title = videoData.snippet.title;
      this.description = videoData.snippet.description;
      this.channelName = videoData.snippet.channelTitle;

      this.article = this.generateArticle();
    } catch (error) {
      console.error('Error fetching video details:', error.message);
      throw error;
    }
  }

  generateArticle() {
    return `Article based on the video: ${this.description}`;
  }
}

module.exports = YouTubeVideo;
