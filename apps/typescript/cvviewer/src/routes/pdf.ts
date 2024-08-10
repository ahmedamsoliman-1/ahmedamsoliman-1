import { Router } from 'express';
import { displayPdf } from '../controllers/pdf';

const router = Router();

router.get('/', displayPdf);

export default router;
