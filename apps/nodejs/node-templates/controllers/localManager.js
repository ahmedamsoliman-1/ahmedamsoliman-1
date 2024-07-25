const fs = require('fs');
const path = require('path');
const multer = require('multer');
const config = require('../config/index');

class LocalManager {
    constructor() {
        this.videoDirectory = path.join(__dirname, config.VID.VID);

        // Configure multer for file uploads
        this.upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, this.videoDirectory);
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + path.extname(file.originalname));
                }
            })
        });
    }

    async listVideos() {
        try {
            return await fs.promises.readdir(this.videoDirectory);
        } catch (error) {
            console.error("Error reading local video directory", error);
            return [];
        }
    }

    async getPreSignedURLForVideo(video) {
        return path.join('/videos', video);
    }

    async uploadVideo(fileName, fileData) {
        try {
          const filePath = path.join(this.videoDirectory, fileName);
          await fs.promises.writeFile(filePath, fileData);
          console.log(`Successfully uploaded video ${fileName} to local storage.`);
        } catch (error) {
          console.error('Error uploading video to local storage:', error);
          throw error;
        }
      }
      
}

module.exports = LocalManager;
