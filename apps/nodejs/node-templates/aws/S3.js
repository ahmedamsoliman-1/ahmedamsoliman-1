const AWSManager = require('./AWSManager');
const { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { S3RequestPresigner } = require('@aws-sdk/s3-request-presigner');
const { parseUrl } = require('@smithy/url-parser');
const { formatUrl } = require('@aws-sdk/util-format-url');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { Hash } = require('@smithy/hash-node');

const config = require('../config');
const middlewares = require('../middlewares/utils');

const region = config.AWS.AWS_REGION;
const bucket = config.AWS.AWS_BUCKET;
const upload_bucket = config.AWS.AWS_UPLOAD_BUCKET;
const path = config.AWS.AWS_PATH;

class S3Manager extends AWSManager {
  constructor() {
    super();
    this.s3 = new S3Client({ region });
    this.bucket = bucket;
    this.upload_bucket = upload_bucket;
    this.path = path;
  }

  async uploadVideo(key, data) {
    try {
      const putObjectCommand = new PutObjectCommand({
        Bucket: this.upload_bucket,
        Key: `${this.path}/${key}`,
        Body: data,
        ContentType: 'video/mp4'
      });
      await this.s3.send(putObjectCommand);
      middlewares.llog(`Successfully Uploaded Video ${key}`, 'green', 'S3');
    } catch (error) {
      middlewares.llog(`Error Uploading Video ${error}`, 'red', 'S3');
      throw error;
    }
  }

  async listVideos() {
    try {
      const listObjectsCommand = new ListObjectsCommand({
        Bucket: this.upload_bucket,
        Prefix: this.path
      });
      const response = await this.s3.send(listObjectsCommand);
      const videos = response.Contents ? response.Contents.map(object => object.Key.replace(`${this.path}/`, '')) : [];
      return videos;
    } catch (error) {
      console.error('Error listing videos:', error);
      throw error;
    }
  }

  async deleteVideo(key) {
    try {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: this.upload_bucket,
        Key: `${this.path}/${key}`
      });
      await this.s3.send(deleteObjectCommand);
      middlewares.llog(`Successfully Deleted Video ${key}`, 'green', 'S3');
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }

  async uploadPicture(key, data) {
    try {
      const putObjectCommand = new PutObjectCommand({
        Bucket: this.bucket,
        Key: `${this.path}/${key}`,
        Body: data
      });
      await this.s3.send(putObjectCommand);
      middlewares.llog(`Successfully Uploaded User Picture ${key}`, 'green', 'S3');
    } catch (error) {
      middlewares.llog(`Error Uploading Picture ${error}`, 'red', 'S3');
      throw error;
    }
  }

  async getPreSignedURL(user, id) {
    try {
      const key = `${this.path}/${user}_id_${id}.jpg`;
      const url = await this.createPresignedUrlWithoutClient({
        region,
        bucket: this.bucket,
        key
      });
      return url;
    } catch (error) {
      console.error('Error getting picture:', error);
      throw error;
    }
  }

  async getPreSignedURLForVideo(video) {
    try {
      const key = '/' + video;
      const url = await this.createPresignedUrlWithoutClient({
        region,
        bucket: this.upload_bucket,
        key
      });
      return url;
    } catch (error) {
      console.error('Error getting picture:', error);
      throw error;
    }
  }
  
  async createPresignedUrlWithoutClient({ region, bucket, key }) {
    const base_url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    const url = parseUrl(base_url);

    const presigner = new S3RequestPresigner({
      credentials: this.credentials,
      region,
      sha256: Hash.bind(null, 'sha256'),
      expiresIn: 1000
    });

    const signedUrlObject = await presigner.presign(new HttpRequest(url));
    return formatUrl(signedUrlObject);
  }


  async listBuckets() {
    try {
      const listBucketsCommand = new ListBucketsCommand({});
      const response = await this.s3.send(listBucketsCommand);
      const buckets = response.Buckets.map(bucket => bucket.Name);
      return buckets;
    } catch (error) {
      console.error('Error listing buckets:', error);
      throw error;
    }
  }

  async listObjects(bucket) {
    try {
      const listObjectsCommand = new ListObjectsCommand({
        Bucket: bucket,
      });
      const response = await this.s3.send(listObjectsCommand);
      const objects = response.Contents.map(object => object.Key);
      return { total: objects.length, list: objects};
    } catch (error) {
      console.error('Error listing objects:', error);
      throw error;
    }
  }

  async listBucketsAndObjects() {
    try {
        const listBucketsCommand = new ListBucketsCommand({});
        const bucketsResponse = await this.s3.send(listBucketsCommand);
        const buckets = bucketsResponse.Buckets.map(bucket => bucket.Name);

        const bucketsWithObjects = await Promise.all(buckets.map(async bucket => {
            const listObjectsCommand = new ListObjectsCommand({
                Bucket: bucket,
            });
            const objectsResponse = await this.s3.send(listObjectsCommand);
            const objects = objectsResponse.Contents.map(object => object.Key);

            // Calculate total size of objects in the bucket
            let totalSize = 0;
            objectsResponse.Contents.forEach(object => {
                totalSize += object.Size;
            });

            const objects_res = {
                total: objects.length,
                size: totalSize, 
                list: objects,
            };

            return { bucket, objects_res };
        }));

        return bucketsWithObjects;
    } catch (error) {
        console.error('Error listing buckets and objects:', error);
        throw error;
    }
  }



}

module.exports = S3Manager;
