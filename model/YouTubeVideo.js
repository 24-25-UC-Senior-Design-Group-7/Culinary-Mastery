import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import youtubedl from 'youtube-dl-exec';
import ffmpegPath from 'ffmpeg-static';

dotenv.config();

class YouTubeVideo {
  constructor(videoId) {
    this.videoId = videoId;
    this.title = null;
    this.description = null;
    this.channelName = null;
    this.transcript = null;
    this.article = null
  }

  // Fetch video details from the YouTube API using the video ID
  async fetchDetails() {
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
    console.log('Fetching video details for ID:', this.videoId);

    try {
      const response = await axios.get(detailsUrl);
      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('Video not found');
      }
      const videoData = response.data.items[0];
      this.title = videoData.snippet.title;
      this.description = videoData.snippet.description;
      this.channelName = videoData.snippet.channelTitle;
    } catch (error) {
      console.error('Error fetching video details:', error.message);
      throw error;
    }
  }

  // Download and convert the video to an audio file using youtube-dl-exec
  async downloadAndConvert(outputAudioPath) {
    // Ensure the directory exists before saving the file
    const directoryPath = path.dirname(outputAudioPath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const videoUrl = `https://www.youtube.com/watch?v=${this.videoId}`;
    return new Promise((resolve, reject) => {
      youtubedl(videoUrl, {
        output: outputAudioPath,
        extractAudio: true,
        audioFormat: 'mp3',
        // Provide the ffmpeg location from ffmpeg-static:
        ffmpegLocation: ffmpegPath
      })
        .then(() => {
          console.log(`Audio file saved to: ${outputAudioPath}`);
          resolve(outputAudioPath);
        })
        .catch(err => {
          console.error('Error during audio conversion:', err);
          reject(err);
        });
    });
  }
}

export default YouTubeVideo;
