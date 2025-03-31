// services/transcriptionModule.js
import fs from 'fs';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';
import dotenv from 'dotenv';
dotenv.config();

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_SPEECH_TO_TEXT_APIKEY,
  }),
  serviceUrl: process.env.IBM_SPEECH_TO_TEXT_URL,
});

/**
 * Streams the audio file to Watson and emits partial transcription results
 * via Socket.IO in real time.
 *
 * @param {string} audioFilePath - The path to the audio file.
 * @param {object} io - The Socket.IO server instance.
 * @param {string} socketId - The Socket.IO client ID to emit updates to.
 * @returns {Promise<string>} - A promise that resolves with the final transcript.
 */
export async function transcribeAudioStreaming(audioFilePath, io, socketId) {
  return new Promise((resolve, reject) => {
    const audioStream = fs.createReadStream(audioFilePath);
    let finalTranscript = "";

    const recognizeStream = speechToText.recognizeUsingWebSocket({
      // Ensure the content type matches your audio file (here we're using MP3)
      contentType: 'audio/mpeg',
      interimResults: true,
    });

    recognizeStream.on('data', (data) => {
      let text = "";
      // If data is a JSON object with transcription results:
      if (data && data.results) {
        data.results.forEach(result => {
          if (result.alternatives && result.alternatives[0]) {
            text += result.alternatives[0].transcript;
            if (result.final) {
              finalTranscript += result.alternatives[0].transcript + " ";
            }
          }
        });
      } else if (Array.isArray(data)) {
        // If data is an array of ASCII codes:
        text = String.fromCharCode(...data);
        finalTranscript += text + " ";
      } else if (Buffer.isBuffer(data)) {
        // If data is a Buffer:
        text = data.toString();
        finalTranscript += text + " ";
      }
      
      // Emit the partial text if we have a valid Socket.IO instance and socketId
      if (text && io && socketId) {
        io.to(socketId).emit('transcriptUpdate', text);
      }
      
      console.log("Received text:", text);
    });

    recognizeStream.on('error', (error) => {
      console.error("Streaming transcription error:", error);
      reject(error);
    });

    recognizeStream.on('close', () => {
      console.log("Streaming transcription closed.");
      resolve(finalTranscript.trim());
    });

    audioStream.pipe(recognizeStream);
  });
}
