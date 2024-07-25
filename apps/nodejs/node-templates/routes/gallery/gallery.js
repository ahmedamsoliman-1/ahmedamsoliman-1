const express = require('express');
var router = express.Router();

const { Storage } = require('@google-cloud/storage');
const GCPBucket = require('../../gcp/BucketManager');

const SVGs = require('../../SVGs');
const config = require('../../config');
const middlewares = require('../../middlewares/utils')
// const authController = require('../../controllers/authController');

const gcp_bucket = new GCPBucket();
const gcp_bucket_name = config.GCP.GCP_BUCKET;
const multer = require('multer');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Assuming you have a folder named 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


router.get('/gallery',  (req, res) => {
  res.render('gallery/gallery', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Gallery', 
    svgs: SVGs,
  });
  res.locals.message = `Gallery Main Page Loaded!`;
});

router.get('/gallery/images', async (req, res) => {
  let imaegs_to_send = []
  const images = await gcp_bucket.listObjects(gcp_bucket_name);
  if (!images) {
    middlewares.llog(`No images found in bucket ${gcp_bucket_name}`, 'red', 'gcp');
    res.redirect('back')
  } else {
    for (const image of images) {
      image.url = `https://storage.googleapis.com/${gcp_bucket_name}/${image.name}`;
      imaegs_to_send.push({ name: image.name, url: image.url });
    }
    res.render('gallery/gallery_template', { 
      user: req.user, 
      time: new Date(),
      pageTitle: 'Gallery', 
      svgs: SVGs,
      images: images
    });
    res.locals.message = `Gallery Main Page Loaded!`;
  }
});

router.post('/gallery/upload-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const image = req.file.path;
  await gcp_bucket.createBucket(gcp_bucket_name);
  const resp = await gcp_bucket.uploadFile(gcp_bucket_name, image);
  res.locals.message = resp;
  res.redirect('back')
});

module.exports = router;