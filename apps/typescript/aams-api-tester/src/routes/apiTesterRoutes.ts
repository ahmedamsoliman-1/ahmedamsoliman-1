import express from 'express';
import { testEndpoint, getResults, renderAddEndpoint } from '../controllers/apiTesterController';

const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/add-endpoint', renderAddEndpoint);
router.post('/test-endpoint', testEndpoint);
router.get('/results', getResults);

export default router;
