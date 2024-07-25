
const S3Manager = require('../aws/S3');
const LocalManager = require('./localManager');
const GCPManager = require('../gcp/BucketManager');

class VideoManager {
    constructor() {
        this.managers = [
            { instance: new S3Manager(), source: 's3' },
            // { instance: new GCPManager(), source: 'gcp' },
            { instance: new LocalManager(), source: 'local' }
        ];
    }

    async listAllVideos() {
        let allVideos = [];

        for (const { instance, source } of this.managers) {
            try {
                
                const videos = await instance.listVideos();
                const videoUrls = await Promise.all(
                    videos.map(async video => ({
                        name: video,
                        url: await instance.getPreSignedURLForVideo(video),
                        source: source
                    }))
                );
                
                allVideos = allVideos.concat(videoUrls);
            } catch (error) {
                console.error(`Error fetching videos from ${source}:`, error);
                allVideos.push({ error: `Error fetching videos from ${source}` });
            }
        }

        return allVideos;
    }

    async uploadVideo(fileName, fileData, storage) {
      try {
        const manager = this.managers.find(manager => manager.source === storage);
        if (!manager) throw new Error(`Invalid storage provider: ${storage}`);
  
        await manager.instance.uploadVideo(fileName, fileData);
      } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
      }
    }
    
    async deleteVideo(fileName, storage) {
      console.log(fileName, storage);
        try {
            const manager = this.managers.find(manager => manager.source === storage);
            if (!manager) throw new Error(`Invalid storage provider: ${storage}`);
            
            await manager.instance.deleteVideo(fileName);
            console.log(`Successfully deleted video ${fileName} from ${storage}.`);
        } catch (error) {
            console.error('Error deleting video:', error);
            throw error;
        }
    }
}

module.exports = new VideoManager();
