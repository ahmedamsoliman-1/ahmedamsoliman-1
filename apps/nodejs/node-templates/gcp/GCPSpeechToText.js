const GCPManager = require('./GCPManager');
const { SpeechClient } = require('@google-cloud/speech');
const middlewares = require('../middlewares/utils');

class GCPSpeechToText extends GCPManager {
  constructor() {
    super();
    this.client = new SpeechClient();
  }

  async transcribeAudio(audioFilePath) {
    try {
      const [response] = await this.client.recognize({
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 24000, // Adjust according to your audio file
          languageCode: 'en-US', // Adjust according to the language of your audio
        },
        audio: { content: require('fs').readFileSync(audioFilePath).toString('base64') },
      });
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Audio transcribed successfully: ${transcription}`);
      return transcription;
    } catch (error) {
      console.error(`Failed to transcribe audio: ${error}`);
      return null;
    }
  }
}

module.exports = GCPSpeechToText;