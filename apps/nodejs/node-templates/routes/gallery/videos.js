const express = require('express');
const multer = require('multer');
const S3Manager = require('../../aws/S3');
const config = require('../../config');
const SVGs = require('../../SVGs');
const middlewares = require('../../middlewares/utils');

const router = express.Router();
const s3Manager = new S3Manager();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const videoController = require('../../controllers/videoManager')


router.get('/videos', async (req, res) => {
    try {
        const videoUrls = await videoController.listAllVideos();

        res.locals.message = `Videos Main Page Loaded!`;
        res.render('videos/videos', {
            videos: videoUrls,
            user: req.user,
            time: new Date(),
            pageTitle: 'Videos',
            svgs: SVGs,
        });
    } catch (error) {
        res.status(500).send('Error fetching videos');
    }
});

router.get('/videos/upload', (req, res) => {
  res.locals.message = `Upload Video Page Loaded!`;
  res.render('videos/upload', {
    user: req.user,
    time: new Date(),
    pageTitle: 'Upload Video',
    svgs: SVGs,
  });
});

router.post('/videos/upload', upload.single('video'), async (req, res) => {
  try {
    const { storage } = req.body; // Assuming a form field named "storage" to select the storage provider
    const fileName = req.file.originalname;
    const fileData = req.file.buffer;

    await videoController.uploadVideo(fileName, fileData, storage);
    res.locals.message = `Video ${fileName} uploaded successfully!`;
    res.redirect('/videos');
  } catch (error) {
    res.status(500).send('Error uploading video');
  }
});

router.get('/videos/delete/:filename', async (req, res) => {
  try {
    const fileName = req.params.filename;
    await videoController.deleteVideo(fileName);
    res.locals.message = `Video deleted successfully!`;
    res.redirect('/videos');
  } catch (error) {
    res.status(500).send('Error deleting video');
  }
});


module.exports = router;
