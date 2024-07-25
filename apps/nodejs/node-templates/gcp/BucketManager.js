const { Storage } = require('@google-cloud/storage');
const GCPManager = require('./GCPManager');

const middlewares = require('../middlewares/utils');
const config = require('../config');

class BucketManager extends GCPManager {
  constructor() {
    super();
    this.storage = new Storage();
    this.upload_bucket = config.GCP.GCP_UPLOAD_BUCJET;
  }

  async listVideos() {
        try {
            const [files] = await this.storage.bucket(this.upload_bucket).getFiles();
            const videos = files.map(file => file.name);
            return videos;
        } catch (error) {
            console.error('Error listing videos:', error);
            throw error;
        }
    }
    
    async getPreSignedURLForVideo(video) {
      try {
          const options = {
              version: 'v4',
              action: 'read',
              expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          };
          const [url] = await this.storage.bucket(this.upload_bucket).file(video).getSignedUrl(options);
          console.log(`Generated pre-signed URL for '${video}': ${url}`);
          return url;
      } catch (error) {
          console.error('Error getting presigned URL:', error);
          throw error;
      }
    }

    async getPreSignedURLForVideo(video) {
      try {
          const file = this.storage.bucket(this.upload_bucket).file(video);
          const [metadata] = await file.getMetadata();
          return metadata.mediaLink;
      } catch (error) {
          console.error('Error getting URL for video:', error);
          throw error;
      }
    }
  

  async createBucket(bucketName) {
    try {
      const [buckets] = await this.storage.getBuckets({ prefix: bucketName });
      
      const bucketExists = buckets.some(bucket => bucket.name === bucketName);
      
      if (bucketExists) {
        middlewares.llog(`Bucket '${bucketName}' already exists.`, 'yellow', 'GCP');
      } else {
        await this.storage.createBucket(bucketName);
        middlewares.llog(`Bucket '${bucketName}' created successfully.`, 'green', 'GCP');
      }
    } catch (error) {
      console.error(`Error creating bucket '${bucketName}':`, error.message);
    }
  }
  

  async uploadFile(bucketName, filePath) {
    try {
      const bucket = this.storage.bucket(bucketName);
      await bucket.upload(filePath);
      return `File '${filePath}' uploaded to bucket '${bucketName}' successfully.`;
    } catch (error) {
      console.error(`Error uploading file '${filePath}' to bucket '${bucketName}':`, error.message);
    }
  }

  async listObjects(bucketName) {
    try {
      const [files] = await this.storage.bucket(bucketName).getFiles();
      middlewares.llog(`Total objects in bucket '${bucketName}' is ${files.length}.`, 'green', 'GCP');
      return files;
    } catch (error) {
      console.error(`Error listing objects in bucket '${bucketName}':`, error.message);
    }
  }
  async deleteBucket(bucketName) {
    try {
        // Delete all objects in the bucket first
        await this.deleteAllObjectsInBucket(bucketName);
        // Delete the bucket
        await this.storage.bucket(bucketName).delete();
        middlewares.llog(`Bucket '${bucketName}' deleted successfully.`, 'red', 'GCP');
    } catch (error) {
        console.error(`Error deleting bucket '${bucketName}':`, error.message);
    }
  }

  async deleteAllObjectsInBucket(bucketName) {
    try {
        const [files] = await this.storage.bucket(bucketName).getFiles();
        const deletePromises = files.map(file => file.delete());
        await Promise.all(deletePromises);
        middlewares.llog(`All objects deleted from bucket '${bucketName}'.`, 'red', 'GCP');
    } catch (error) {
        console.error(`Error deleting objects in bucket '${bucketName}':`, error.message);
        throw error;
    }
  }


  async listBuckets() {
    try {
      const [buckets] = await this.storage.getBuckets();
      return buckets;
    } catch (error) {
      console.error('Error listing buckets:', error);
      throw error;
    }
  }
}


module.exports = BucketManager;
