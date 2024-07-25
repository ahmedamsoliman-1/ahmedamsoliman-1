const GCPManager = require('./GCPManager');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const middlewares = require('../middlewares/utils');

class GCPTextToSpeech extends GCPManager {
  constructor() {
    super();
    this.client = new TextToSpeechClient();
  }

  async synthesizeSpeech(text, outputFilePath, languageCode = 'en-US', voiceName = 'en-US-Wavenet-D', pitch = 0.0, speakingRate = 1.0, volumeGainDb = 0.0) {
    try {
      const request = {
        input: { text },
        voice: { languageCode, name: voiceName },
        audioConfig: { audioEncoding: 'LINEAR16', pitch, speakingRate, volumeGainDb },
      };
      const [response] = await this.client.synthesizeSpeech(request);
      const writeFilePromise = new Promise((resolve, reject) => {
        const writeFile = require('fs').writeFile;
        writeFile(outputFilePath, response.audioContent, 'binary', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      await writeFilePromise;
      console.log(`Speech synthesized successfully and saved to ${outputFilePath}`);
    } catch (error) {
      console.error(`Failed to synthesize speech: ${error}`);
    }
  }
}


module.exports = GCPTextToSpeech;